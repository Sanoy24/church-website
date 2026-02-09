-- Church Website Database Schema (Postgres)

-- Drop tables if they exist (careful in production!)
-- DROP TABLE IF EXISTS donation_accounts;
-- DROP TABLE IF EXISTS sermons;
-- DROP TABLE IF EXISTS events;
-- DROP TABLE IF EXISTS ministries;
-- DROP TABLE IF EXISTS users;
-- DROP TYPE IF EXISTS role_enum;

-- Create Role Enum
DO $$ BEGIN
    CREATE TYPE role_enum AS ENUM('admin', 'editor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Ministries Table
CREATE TABLE IF NOT EXISTS ministries (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  detailed_description TEXT NOT NULL,
  schedule VARCHAR(255),
  leader VARCHAR(255),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_date_events ON events (date);

-- Sermons Table
CREATE TABLE IF NOT EXISTS sermons (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  series VARCHAR(255),
  preacher VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  image_url VARCHAR(500),
  video_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_date_sermons ON sermons (date);
CREATE INDEX IF NOT EXISTS idx_series_sermons ON sermons (series);

-- Donation Accounts Table
CREATE TABLE IF NOT EXISTS donation_accounts (
  id SERIAL PRIMARY KEY,
  bank_name VARCHAR(255) NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  account_number VARCHAR(255) NOT NULL,
  account_type VARCHAR(100),
  color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role role_enum DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger function for updated_at (if needed, simplified for now)
-- For true ON UPDATE CURRENT_TIMESTAMP, Postgres needs a trigger.
