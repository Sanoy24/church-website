const { query, pool } = require('./config/database');

async function testConnection() {
  try {
    console.log('Testing connection to Neon (Postgres)...');
    const [rows] = await query('SELECT NOW() as current_time');
    console.log('✅ Connection successful!');
    console.log('Current Time from DB:', rows[0].current_time);

    console.log('\nChecking tables...');
    const [tables] = await query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    if (tables.length === 0) {
      console.log('⚠️ No tables found in public schema. Have you run postgres_schema.sql?');
    } else {
      console.log('Found tables:', tables.map(t => t.table_name).join(', '));
    }

  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    await pool.end();
  }
}

testConnection();
