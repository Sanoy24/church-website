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

-- Gallery Photos Table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  event_date DATE,
  image_url VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_event_date (event_date),
  INDEX idx_featured (is_featured)
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

-- Staff Members Table
CREATE TABLE IF NOT EXISTS staff_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT,
  image_url VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_staff_active (is_active),
  INDEX idx_staff_order (display_order)
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

-- Sample Data for Gallery
INSERT INTO gallery_photos (title, description, category, event_date, image_url, display_order, is_featured) VALUES
('Sunday Worship Celebration', 'A joyful worship moment from our Sunday gathering.', 'Worship', '2025-02-16', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2670&auto=format&fit=crop', 1, TRUE),
('Youth Revival Night', 'Young people gathering for prayer, music, and fellowship.', 'Youth', '2025-01-24', 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2669&auto=format&fit=crop', 2, TRUE),
('Community Outreach Day', 'Serving families in the neighborhood with food and support.', 'Outreach', '2024-12-07', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop', 3, FALSE),
('Children Ministry Sunday', 'Children learning, laughing, and worshipping together.', 'Children', '2024-11-10', 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2669&auto=format&fit=crop', 4, FALSE),
('Christmas Choir Rehearsal', 'Preparing songs and harmonies for the Christmas service.', 'Choir', '2024-12-18', 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2670&auto=format&fit=crop', 5, FALSE),
('Church Family Gathering', 'A warm church family photo after a special service.', 'Community', '2024-10-27', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop', 6, FALSE);

-- Sample Data for Donation Accounts
INSERT INTO donation_accounts (bank_name, account_name, account_number, account_type, color) VALUES
('Commercial Bank of Ethiopia', 'Zegen Church', '1000123456789', 'Savings', 'orange'),
('Awash Bank', 'Zegen Church Ministries', '2000987654321', 'Current', 'blue');

-- Sample Data for Staff Members
INSERT INTO staff_members (name, role, bio, image_url, display_order, is_active) VALUES
('Rev. Dr. Tesfaye', 'Senior Pastor', 'Guiding the church with wisdom, prayer, and a deep love for the Word.', 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=2578&auto=format&fit=crop', 1, TRUE),
('Pastor Martha', 'Worship Leader', 'Leading the congregation into heartfelt worship every week.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop', 2, TRUE),
('Pastor Elias', 'Youth Outreach', 'Mentoring young people and building spaces where they can grow in faith.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop', 3, TRUE),
('Pastor Sarah', 'Children''s Ministry', 'Serving children and families with joyful, Christ-centered care.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2622&auto=format&fit=crop', 4, TRUE);
