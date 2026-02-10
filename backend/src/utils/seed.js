const db = require("../config/database");
const bcrypt = require("bcryptjs");

async function run() {
    try {
        console.log("🌱 Starting MySQL seed...");

        // 0. Create Tables if they don't exist
        console.log("🛠️ Creating tables if they don't exist...");
        
        await db.query(`
            CREATE TABLE IF NOT EXISTS ministries (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                detailed_description TEXT NOT NULL,
                schedule VARCHAR(255),
                leader VARCHAR(255),
                image_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS events (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                date DATE NOT NULL,
                time VARCHAR(100) NOT NULL,
                location VARCHAR(255) NOT NULL,
                image_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_date (date)
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS sermons (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                series VARCHAR(255),
                preacher VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                image_url VARCHAR(500),
                video_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_date (date),
                INDEX idx_series (series)
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS donation_accounts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                bank_name VARCHAR(255) NOT NULL,
                account_name VARCHAR(255) NOT NULL,
                account_number VARCHAR(255) NOT NULL,
                account_type VARCHAR(100),
                color VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role ENUM('admin', 'editor') DEFAULT 'editor',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Clear existing data
        console.log("🧹 Clearing existing data...");
        await db.query("SET FOREIGN_KEY_CHECKS = 0");
        await db.query("TRUNCATE TABLE users");
        await db.query("TRUNCATE TABLE events");
        await db.query("TRUNCATE TABLE ministries");
        await db.query("TRUNCATE TABLE sermons");
        await db.query("TRUNCATE TABLE donation_accounts");
        await db.query("SET FOREIGN_KEY_CHECKS = 1");

        // 1. Seed Users
        // Plain password: user
        const hashedPassword = await bcrypt.hash("user", 10);
        console.log("👤 Seeding users...");
        await db.query(
            "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?), (?, ?, ?)",
            [
                "admin@church.org", hashedPassword, "admin",
                "editor@church.org", hashedPassword, "editor"
            ]
        );

        // 2. Seed Events
        console.log("📅 Seeding events...");
        await db.query(
            "INSERT INTO events (title, description, date, time, location, image_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)",
            [
                "Sunday Worship Service", "Join us for our weekly worship service.", "2026-02-15", "10:00 AM", "Main Sanctuary", "https://images.unsplash.com/photo-1438232992991-995b7058bbb3",
                "Mid-week Bible Study", "Deep dive into the Word together.", "2026-02-18", "6:30 PM", "Fellowship Hall", "https://images.unsplash.com/photo-1504052434569-70ad58ebb96e"
            ]
        );

        // 3. Seed Ministries
        console.log("🤝 Seeding ministries...");
        await db.query(
            "INSERT INTO ministries (title, description, detailed_description, schedule, leader, image_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)",
            [
                "Youth Ministry", "Building the next generation of leaders.", "Our youth ministry focuses on discipleship and community for ages 13-18.", "Fridays at 7:00 PM", "Mark Thompson", "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
                "Worship Team", "Leading the congregation in praise.", "The worship team coordinates music and multimedia for all services.", "Thursdays at 6:00 PM", "Sarah Williams", "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
            ]
        );

        // 4. Seed Sermons
        console.log("📖 Seeding sermons...");
        await db.query(
            "INSERT INTO sermons (title, series, preacher, date, image_url, video_url) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)",
            [
                "Foundations of Faith", "Essential Beliefs", "Pastor John Smith", "2026-02-08", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "Living in Grace", "Grace Walk", "Pastor Sarah Lee", "2026-02-01", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            ]
        );

        // 5. Seed Donation Accounts
        console.log("💰 Seeding donation accounts...");
        await db.query(
            "INSERT INTO donation_accounts (bank_name, account_name, account_number, account_type, color) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)",
            [
                "Main Street Bank", "Zegen Church General", "1234567890", "Checking", "blue",
                "Community Credit Union", "Building Fund", "0987654321", "Savings", "green"
            ]
        );

        console.log("✅ MySQL Seed completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    }
}

run();

