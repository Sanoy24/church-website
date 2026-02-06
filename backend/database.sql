-- Church Website Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS church_db;
USE church_db;

-- Ministries Table
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
);

-- Events Table
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
);

-- Sermons Table
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
);

-- Donation Accounts Table
CREATE TABLE IF NOT EXISTS donation_accounts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  bank_name VARCHAR(255) NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  account_number VARCHAR(255) NOT NULL,
  account_type VARCHAR(100),
  color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users Table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample Data for Ministries
INSERT INTO ministries (title, description, detailed_description, schedule, leader, image_url) VALUES
('Children\'s Ministry', 'Nurturing the next generation in faith and love through engaging activities and biblical teaching.', 'Our Children\'s Ministry is dedicated to partnering with parents to lead children to become fully devoted followers of Christ. Through age-specific lessons, activities, and small groups, children learn biblical truths in a fun and safe environment. We offer programs for infants through 5th grade during all weekend services.', 'Sundays at 9:00 AM & 11:00 AM', 'Sarah Johnson', 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2669&auto=format&fit=crop'),
('Youth Ministry', 'Empowering young people to live bold lives for Christ and make an impact in their world.', 'The Youth Ministry exists to reach students with the gospel and teach them how to walk with the Lord. We provide a space for middle and high school students to belong, ask questions, and grow in their faith. Join us for high-energy worship, relevant teaching, and small group discussions.', 'Wednesdays at 7:00 PM', 'Mark Davis', 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop'),
('Global Outreach', 'Extending our hands to serve the community and spread the gospel across the nations.', 'We believe the church is called to go beyond its four walls. Our Global Outreach team coordinates mission trips, supports local community projects, and partners with organizations worldwide to meet physical and spiritual needs. Everyone has a part to play in the Great Commission.', 'Various Monthly Events', 'Dr. James Wilson', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop');

-- Sample Data for Events
INSERT INTO events (title, description, date, time, location, image_url) VALUES
('Community Prayer Night', 'Join us for a powerful evening of community prayer and worship. This is a special time dedicated to coming together as one family to seek God\'s presence, pray for our community, and support one another in faith. Whether you\'re a regular member or visiting for the first time, all are welcome.', '2023-11-14', '7:00 PM - 8:30 PM', 'Main Sanctuary', 'https://images.unsplash.com/photo-1510590611086-309679432aa8?q=80&w=2669&auto=format&fit=crop'),
('Youth Summer Camp', 'An exciting week for our youth to build friendships, grow in faith, and enjoy outdoor activities! Our summer camp features team-building exercises, inspiring workshops, and fun recreational games designed to empower and inspire the next generation.', '2023-12-05', '9:00 AM - 4:00 PM', 'Camp Valley Center', 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop'),
('Christmas Choir Practice', 'Help us prepare for our annual Christmas concert. We\'re looking for passionate voices to join our choir as we practice beautiful carols and hymns. No previous experience required—just a heart for worship and a love for music!', '2023-12-12', '6:00 PM - 8:00 PM', 'Music Hall', 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2670&auto=format&fit=crop');

-- Sample Data for Sermons
INSERT INTO sermons (title, series, preacher, date, image_url) VALUES
('Walking in Faith', 'Faith Series', 'Pastor John Smith', '2023-11-05', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2670&auto=format&fit=crop'),
('The Power of Prayer', 'Prayer Life', 'Pastor Sarah Lee', '2023-10-29', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop'),
('Living with Purpose', 'Purpose Driven', 'Pastor John Smith', '2023-10-22', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2670&auto=format&fit=crop');

-- Sample Data for Donation Accounts
INSERT INTO donation_accounts (bank_name, account_name, account_number, account_type, color) VALUES
('Commercial Bank of Ethiopia', 'Zegen Church', '1000123456789', 'Savings', 'orange'),
('Awash Bank', 'Zegen Church Ministries', '2000987654321', 'Current', 'blue');
