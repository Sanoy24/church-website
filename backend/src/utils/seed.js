const db = require('../config/database');

async function run() {
  try {
    // Create users table
    await db.query(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'editor',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create events table
    await db.query(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT,
      time TEXT,
      location TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Insert sample users
    await db.query(`INSERT OR IGNORE INTO users (id, email, password_hash, role) VALUES (1, 'admin@church.org', 'password-hash-placeholder', 'admin')`);
    await db.query(`INSERT OR IGNORE INTO users (id, email, password_hash, role) VALUES (2, 'editor@church.org', 'password-hash-placeholder', 'editor')`);

    // Insert sample events
    const sampleEvents = [
      ['Community Prayer Night', 'Join us for community prayer and worship.', '2023-11-14', '7:00 PM - 8:30 PM', 'Main Sanctuary', 'https://images.unsplash.com/photo-1510590611086-309679432aa8?q=80&w=2669&auto=format&fit=crop'],
      ['Youth Summer Camp', 'A week for youth with activities and workshops.', '2023-12-05', '9:00 AM - 4:00 PM', 'Camp Valley Center', 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop'],
      ['Christmas Choir Practice', 'Choir practice for the Christmas concert.', '2023-12-12', '6:00 PM - 8:00 PM', 'Music Hall', 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2670&auto=format&fit=crop']
    ];

    for (const ev of sampleEvents) {
      await db.query(`INSERT INTO events (title, description, date, time, location, image_url) VALUES (?, ?, ?, ?, ?, ?)`, ev);
    }

    console.log('✅ Seed completed. SQLite DB is ready at data/dev.sqlite');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

run();
