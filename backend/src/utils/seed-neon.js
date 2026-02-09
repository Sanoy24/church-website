const { query, pool } = require("../config/database");

async function run() {
    try {
        console.log("Seeding Neon (Postgres) database...");

        // Insert sample users
        console.log("Seeding users...");
        await query(
            `INSERT INTO users (email, password_hash, role) VALUES 
            ('admin@church.org', '$2a$10$Gz/ZPaiyF3yYjDAGh3D0uuyANSVOd9M0dcVioXJomsQg0q96POqpy', 'admin'),
            ('editor@church.org', '$2a$10$Gz/ZPaiyF3yYjDAGh3D0uuyANSVOd9M0dcVioXJomsQg0q96POqpy', 'editor')
            ON CONFLICT (email) DO NOTHING`
        );

        // Insert sample events
        console.log("Seeding events...");
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
            ]
        ];

        for (const ev of sampleEvents) {
            await query(
                `INSERT INTO events (title, description, date, time, location, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
                ev
            );
        }

        // Insert sample ministries
        console.log("Seeding ministries...");
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
            ]
        ];

        for (const m of sampleMinistries) {
            await query(
                `INSERT INTO ministries (title, description, detailed_description, schedule, leader, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
                m
            );
        }

        // Insert sample sermons
        console.log("Seeding sermons...");
        const sampleSermons = [
            [
                "Walking in Faith",
                "Faith Series",
                "Pastor John Smith",
                "2023-11-05",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2670&auto=format&fit=crop",
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            ]
        ];

        for (const s of sampleSermons) {
            await query(
                `INSERT INTO sermons (title, series, preacher, date, image_url, video_url) VALUES (?, ?, ?, ?, ?, ?)`,
                s
            );
        }

        // Insert sample donation accounts
        console.log("Seeding donation accounts...");
        const sampleDonations = [
            [
                "Commercial Bank of Ethiopia",
                "Zegen Church",
                "1000123456789",
                "Savings",
                "orange",
            ]
        ];

        for (const d of sampleDonations) {
            await query(
                `INSERT INTO donation_accounts (bank_name, account_name, account_number, account_type, color) VALUES (?, ?, ?, ?, ?)`,
                d
            );
        }

        console.log("✅ Seed completed successfully!");
    } catch (err) {
        console.error("❌ Seed failed:", err);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

run();
