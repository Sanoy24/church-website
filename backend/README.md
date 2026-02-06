# Church Website Backend API

A RESTful API built with Node.js, Express, and MySQL for managing church website content.

## Features

- **Ministries Management** - CRUD operations for church ministries
- **Events Management** - Calendar-based event system
- **Sermons Archive** - Searchable sermon database with pagination
- **Donation Accounts** - Bank account information management
- **JWT Authentication** - Secure admin authentication

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcrypt

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=church_db
   JWT_SECRET=your_secret_key
   ```

4. **Create database and tables**
   ```bash
   mysql -u root -p < database.sql
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The API will be running at `http://localhost:5000`

## API Endpoints

### Public Endpoints (No Authentication Required)

#### Ministries
- `GET /api/ministries` - Get all ministries
- `GET /api/ministries/:id` - Get single ministry

#### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `GET /api/events/calendar/:year/:month` - Get events for specific month

#### Sermons
- `GET /api/sermons` - Get all sermons (supports `?search=query&limit=10&offset=0`)
- `GET /api/sermons/recent` - Get recent sermons
- `GET /api/sermons/:id` - Get single sermon

#### Donations
- `GET /api/donations` - Get all donation accounts

### Protected Endpoints (Authentication Required)

Add `Authorization: Bearer <token>` header to requests.

#### Ministries
- `POST /api/ministries` - Create ministry
- `PUT /api/ministries/:id` - Update ministry
- `DELETE /api/ministries/:id` - Delete ministry

#### Events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

#### Sermons
- `POST /api/sermons` - Create sermon
- `PUT /api/sermons/:id` - Update sermon
- `DELETE /api/sermons/:id` - Delete sermon

#### Donations
- `POST /api/donations` - Create donation account
- `PUT /api/donations/:id` - Update donation account
- `DELETE /api/donations/:id` - Delete donation account

### Authentication
- `POST /api/auth/login` - Login (returns JWT token)
- `GET /api/auth/me` - Get current user info

## Example Requests

### Get All Ministries
```bash
curl http://localhost:5000/api/ministries
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@church.com","password":"password"}'
```

### Create Event (Authenticated)
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Sunday Service",
    "description": "Weekly worship service",
    "date": "2024-01-07",
    "time": "10:00 AM",
    "location": "Main Sanctuary",
    "image_url": "https://example.com/image.jpg"
  }'
```

## Database Schema

See `database.sql` for complete schema and sample data.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MySQL connection pool
│   ├── controllers/
│   │   ├── ministryController.js
│   │   ├── eventController.js
│   │   ├── sermonController.js
│   │   ├── donationController.js
│   │   └── authController.js
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── errorHandler.js      # Global error handler
│   ├── models/
│   │   ├── Ministry.js
│   │   ├── Event.js
│   │   ├── Sermon.js
│   │   ├── Donation.js
│   │   └── User.js
│   ├── routes/
│   │   ├── ministries.js
│   │   ├── events.js
│   │   ├── sermons.js
│   │   ├── donations.js
│   │   └── auth.js
│   └── server.js                # Main application file
├── .env                         # Environment variables (not in git)
├── .env.example                 # Environment template
├── database.sql                 # Database schema and seed data
└── package.json
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Helmet for security headers
- CORS configured for frontend origin
- SQL injection protection via parameterized queries

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `DB_HOST` | MySQL host | localhost |
| `DB_USER` | MySQL user | root |
| `DB_PASSWORD` | MySQL password | - |
| `DB_NAME` | Database name | church_db |
| `DB_PORT` | MySQL port | 3306 |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | Token expiration | 7d |
| `CORS_ORIGIN` | Allowed origin | http://localhost:5173 |

## License

ISC
