# Backend Setup Instructions

## Quick Start Guide

### 1. Database Setup

First, you need to create the MySQL database and tables:

```bash
# Login to MySQL
mysql -u root -p

# Run the database script
source database.sql

# Or if you're on Windows:
mysql -u root -p < database.sql
```

### 2. Environment Configuration

The `.env` file has been created with default values. Update it with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=church_db
```

### 3. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at: `http://localhost:5000`

### 4. Test the API

```bash
# Health check
curl http://localhost:5000/health

# Get all ministries
curl http://localhost:5000/api/ministries

# Get all events
curl http://localhost:5000/api/events
```

## Next Steps

1. **Create an admin user** (you'll need to manually insert into the database):
   ```sql
   INSERT INTO users (email, password_hash, role) 
   VALUES ('admin@church.com', '$2a$10$...', 'admin');
   ```
   Or use bcrypt to hash a password and insert it.

2. **Test authentication** by logging in through the `/api/auth/login` endpoint

3. **Connect the frontend** by updating the React app to use the API

## Troubleshooting

- **Database connection fails**: Check your MySQL credentials in `.env`
- **Port already in use**: Change the `PORT` in `.env`
- **CORS errors**: Update `CORS_ORIGIN` in `.env` to match your frontend URL
