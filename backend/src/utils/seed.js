const db = require("../config/database");

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

        // Create ministries table
        await db.query(`CREATE TABLE IF NOT EXISTS ministries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            detailed_description TEXT,
            schedule TEXT,
            leader TEXT,
            image_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Create sermons table
        await db.query(`CREATE TABLE IF NOT EXISTS sermons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            series TEXT,
            preacher TEXT,
            date TEXT,
            image_url TEXT,
            video_url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Create donation_accounts table
        await db.query(`CREATE TABLE IF NOT EXISTS donation_accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bank_name TEXT NOT NULL,
            account_name TEXT NOT NULL,
            account_number TEXT NOT NULL,
            account_type TEXT,
            color TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Insert sample users
        await db.query(
            `INSERT OR IGNORE INTO users (id, email, password_hash, role) VALUES (1, 'admin@church.org', 'password-hash-placeholder', 'admin')`,
        );
        await db.query(
            `INSERT OR IGNORE INTO users (id, email, password_hash, role) VALUES (2, 'editor@church.org', 'password-hash-placeholder', 'editor')`,
        );

        // Insert sample events
        const sampleEvents = [
            [
                "Community Prayer Night",
                "Join us for community prayer and worship.",
                "2026-02-14",
                "7:00 PM - 8:30 PM",
                "Main Sanctuary",
                "https://images.unsplash.com/photo-1510590611086-309679432aa8?q=80&w=2669&auto=format&fit=crop",
            ],
            [
                "Youth Summer Camp",
                "A week for youth with activities and workshops.",
                "2026-02-25",
                "9:00 AM - 4:00 PM",
                "Camp Valley Center",
                "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop",
            ],
            [
                "Worship & Praise Workshop",
                "Enhance your worship experience with our music team.",
                "2026-02-01",
                "6:00 PM - 8:00 PM",
                "Music Hall",
                "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2670&auto=format&fit=crop",
            ],
            [
                "Spiritual Growth Seminar",
                "Deep dive into biblical foundations and spiritual disciplines.",
                "2026-01-20",
                "10:00 AM - 2:00 PM",
                "Seminar Room A",
                "https://images.unsplash.com/photo-1510590611086-309679432aa8?q=80&w=2669&auto=format&fit=crop",
            ],
            [
                "Spring Family Fest",
                "A day of fun, food, and fellowship for the whole family.",
                "2026-03-05",
                "11:00 AM - 5:00 PM",
                "Church Gardens",
                "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop",
            ],
        ];

        for (const ev of sampleEvents) {
            await db.query(
                `INSERT INTO events (title, description, date, time, location, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
                ev,
            );
        }

        // Insert sample ministries
        const sampleMinistries = [
            [
                "Children's Ministry",
                "Nurturing the next generation in faith and love through engaging activities and biblical teaching.",
                "Our Children's Ministry is dedicated to partnering with parents to lead children to become fully devoted followers of Christ. Through age-specific lessons, activities, and small groups, children learn biblical truths in a fun and safe environment. We offer programs for infants through 5th grade during all weekend services.",
                "Sundays at 9:00 AM & 11:00 AM",
                "Sarah Johnson",
                "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2669&auto=format&fit=crop",
            ],
            [
                "Youth Ministry",
                "Empowering young people to live bold lives for Christ and make an impact in their world.",
                "The Youth Ministry exists to reach students with the gospel and teach them how to walk with the Lord. We provide a space for middle and high school students to belong, ask questions, and grow in their faith. Join us for high-energy worship, relevant teaching, and small group discussions.",
                "Wednesdays at 7:00 PM",
                "Mark Davis",
                "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop",
            ],
            [
                "Global Outreach",
                "Extending our hands to serve the community and spread the gospel across the nations.",
                "We believe the church is called to go beyond its four walls. Our Global Outreach team coordinates mission trips, supports local community projects, and partners with organizations worldwide to meet physical and spiritual needs. Everyone has a part to play in the Great Commission.",
                "Various Monthly Events",
                "Dr. James Wilson",
                "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop",
            ],
            [
                "Men's Ministry",
                "Building strong men of faith through fellowship, accountability, and biblical discipleship.",
                "The Men's Ministry provides a space for men of all ages to grow in their relationship with God and each other. We focus on biblical leadership, family responsibility, and personal integrity through weekly breakfast meetings and annual retreats.",
                "Saturdays at 7:30 AM",
                "Robert Thompson",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2670&auto=format&fit=crop",
            ],
            [
                "Women's Ministry",
                "Fostering a community where women are encouraged, equipped, and empowered to serve.",
                "Our Women's Ministry is dedicated to helping women discover their identity in Christ and their purpose in the world. We offer weekly Bible studies, mentorship programs, and seasonal events that provide spiritual nourishment and meaningful connection.",
                "Tuesdays at 10:00 AM",
                "Elizabeth Bennett",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2669&auto=format&fit=crop",
            ],
            [
                "Worship & Arts",
                "Leading the congregation into the presence of God through music, media, and creative arts.",
                "The Worship & Arts ministry is responsible for the musical and technical aspects of our services. From the choir and band to sound and lighting, our goal is to create an atmosphere where people can encounter the living God through authentic worship and creative expression.",
                "Sundays at 8:00 AM (Rehearsal)",
                "David Williams",
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop",
            ],
            [
                "Hospitality Team",
                "Creating a warm and welcoming environment for every guest and member who enters our doors.",
                "First impressions matter. Our Hospitality Team includes greeters, ushers, and the information desk staff. We are committed to showing the love of Christ by making everyone feel at home from the moment they arrive in our parking lot to the moment they leave.",
                "Sundays - All Services",
                "Linda Martinez",
                "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2669&auto=format&fit=crop",
            ],
        ];

        for (const m of sampleMinistries) {
            await db.query(
                `INSERT INTO ministries (title, description, detailed_description, schedule, leader, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
                m,
            );
        }

        // Insert sample sermons
        const sampleSermons = [
            [
                "Walking in Faith",
                "Faith Series",
                "Pastor John Smith",
                "2023-11-05",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2670&auto=format&fit=crop",
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            ],
            [
                "The Power of Prayer",
                "Prayer Life",
                "Pastor Sarah Lee",
                "2023-10-29",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop",
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            ],
            [
                "Living with Purpose",
                "Purpose Driven",
                "Pastor John Smith",
                "2023-10-22",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2670&auto=format&fit=crop",
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            ],
        ];

        for (const s of sampleSermons) {
            await db.query(
                `INSERT INTO sermons (title, series, preacher, date, image_url, video_url) VALUES (?, ?, ?, ?, ?, ?)`,
                s,
            );
        }

        // Insert sample donation accounts
        const sampleDonations = [
            [
                "Commercial Bank of Ethiopia",
                "Zegen Church",
                "1000123456789",
                "Savings",
                "orange",
            ],
            [
                "Awash Bank",
                "Zegen Church Ministries",
                "2000987654321",
                "Current",
                "blue",
            ],
        ];

        for (const d of sampleDonations) {
            await db.query(
                `INSERT INTO donation_accounts (bank_name, account_name, account_number, account_type, color) VALUES (?, ?, ?, ?, ?)`,
                d,
            );
        }

        console.log("✅ Seed completed. SQLite DB is ready at data/dev.sqlite");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    }
}

run();
