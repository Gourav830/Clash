# Clash Server - Backend API

The backend server for Clash, an image comparison and voting platform. Built with Node.js, Express.js, and PostgreSQL, featuring real-time capabilities, queue processing, and secure authentication.

## 🚀 Features

### Core API Features

- **Authentication & Authorization** - JWT-based secure authentication
- **Clash Management** - CRUD operations for image battles
- **Real-time Voting** - Socket.io integration for live vote updates
- **File Upload** - Secure image upload and storage
- **Email Service** - Automated email notifications and verification
- **Queue Processing** - Background job processing with BullMQ

### Security & Performance

- **Rate Limiting** - Protection against spam and abuse
- **Input Validation** - Zod schema validation for all endpoints
- **CORS Protection** - Cross-origin request security
- **Helmet Security** - Comprehensive security headers
- **Database Optimization** - Efficient Prisma ORM queries
- **Caching** - Redis-based caching for improved performance

## 🛠️ Tech Stack

### Core Technologies

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Cache/Queue:** Redis with BullMQ
- **Real-time:** Socket.io

### Libraries & Middleware

- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **File Upload:** express-fileupload, multer
- **Email:** Nodemailer
- **Validation:** Zod
- **Security:** Helmet, express-rate-limit, CORS
- **Template Engine:** EJS for email templates
- **Utilities:** moment, uuid

## 📁 Project Structure

```
server/
├── src/
│   ├── config/                 # Configuration files
│   │   ├── database.ts         # Prisma database configuration
│   │   ├── fileSystem.ts       # File upload configuration
│   │   ├── mail.ts             # Email service configuration
│   │   ├── queue.ts            # BullMQ queue configuration
│   │   └── rateLimit.ts        # Rate limiting configuration
│   │
│   ├── routes/                 # API route handlers
│   │   ├── authRoutes.ts       # Authentication endpoints
│   │   ├── clashRoutes.ts      # Clash CRUD operations
│   │   └── index.ts            # Route aggregation
│   │
│   ├── middleware/             # Custom middleware
│   │   └── authMiddleWare.ts   # JWT authentication middleware
│   │
│   ├── jobs/                   # Background job processors
│   │   ├── commentjob.ts       # Comment processing jobs
│   │   ├── emailJobs.ts        # Email sending jobs
│   │   ├── votingJobs.ts       # Vote counting jobs
│   │   └── index.ts            # Job aggregation
│   │
│   ├── validations/            # Zod validation schemas
│   │   └── clashValidation.ts  # Clash input validation
│   │
│   ├── views/                  # Email templates (EJS)
│   │   ├── emails/             # HTML email templates
│   │   └── layouts/            # Email layouts
│   │
│   ├── helper.ts               # Utility functions
│   ├── socket.ts               # Socket.io configuration
│   ├── index.ts                # Main server entry point
│   └── custom-types.d.ts       # TypeScript type definitions
│
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migration files
│
├── public/
│   └── images/                 # Uploaded image storage
│
├── dist/                       # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or hosted)
- Redis server (local or hosted)

### 1️⃣ Install Dependencies

```bash
cd server
npm install
```

### 2️⃣ Environment Configuration

Create a `.env` file in the server root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/clash_db"

# JWT & Authentication
JWT_SECRET="your-super-secret-jwt-key-min-32-characters"
TOKEN_EXPIRY="7d"

# Redis Configuration
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379
REDIS_PASSWORD=""

# Email Service Configuration
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="Clash App <noreply@clash.com>"

# Server Configuration
PORT=8000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB in bytes
UPLOAD_DIR="./public/images"
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/gif,image/webp"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

### 3️⃣ Database Setup

#### Run PostgreSQL (using Docker):

```bash
docker run -d \
  --name postgres-clash \
  -e POSTGRES_DB=clash_db \
  -e POSTGRES_USER=clash_user \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  postgres:15
```

#### Run Redis (using Docker):

```bash
docker run -d \
  --name redis-clash \
  -p 6379:6379 \
  redis:alpine
```

#### Initialize Database:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed database with sample data
npx prisma db seed
```

### 4️⃣ Build and Run

#### Development Mode:

```bash
# Run with hot reloading (watch mode)
npm run dev

# Or run individual commands
npm run watch    # TypeScript compilation watch
npm run server   # Run server with nodemon
```

#### Production Mode:

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint           | Description               | Auth Required |
| ------ | ------------------ | ------------------------- | ------------- |
| POST   | `/register`        | User registration         | No            |
| POST   | `/login`           | User login                | No            |
| POST   | `/verify-email`    | Email verification        | No            |
| POST   | `/forgot-password` | Request password reset    | No            |
| POST   | `/reset-password`  | Reset password with token | No            |

### Clash Routes (`/api/clash`)

| Method | Endpoint | Description         | Auth Required |
| ------ | -------- | ------------------- | ------------- |
| GET    | `/`      | Get user's clashes  | Yes           |
| POST   | `/`      | Create new clash    | Yes           |
| GET    | `/:id`   | Get clash by ID     | No            |
| PUT    | `/:id`   | Update clash        | Yes           |
| DELETE | `/:id`   | Delete clash        | Yes           |
| POST   | `/items` | Add images to clash | Yes           |

### Request/Response Examples

#### Create Clash

**Request:**

```bash
POST /api/clash
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Best Coffee Shop",
  "description": "Which coffee shop has the better ambiance?",
  "expires_at": "2024-12-31T23:59:59.000Z",
  "image": <file>
}
```

**Response:**

```json
{
  "message": "Clash created successfully",
  "data": {
    "id": 1,
    "title": "Best Coffee Shop",
    "description": "Which coffee shop has the better ambiance?",
    "image": "unique-filename.jpg",
    "expires_at": "2024-12-31T23:59:59.000Z",
    "created_at": "2024-01-15T10:30:00.000Z",
    "user_id": 1
  }
}
```

#### Add Clash Items

**Request:**

```bash
POST /api/clash/items
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "id": 1,
  "images[]": [<file1>, <file2>]
}
```

## 🔌 Socket.io Events

### Real-time Events

The server emits and listens to the following Socket.io events:

| Event                        | Direction        | Data                        | Description       |
| ---------------------------- | ---------------- | --------------------------- | ----------------- |
| `clashing-{clashId}`         | Client → Server  | `{clashId, clashItemId}`    | Vote submission   |
| `clashing-{clashId}`         | Server → Clients | `{clashItemId}`             | Vote count update |
| `clashing_comment-{clashId}` | Client → Server  | `{id, comment, created_at}` | New comment       |
| `clashing_comment-{clashId}` | Server → Clients | `{id, comment, created_at}` | Comment broadcast |

### Usage Example

```javascript
// Client-side voting
socket.emit("clashing-123", {
  clashId: 123,
  clashItemId: 456,
});

// Listen for vote updates
socket.on("clashing-123", (data) => {
  console.log("Vote update:", data.clashItemId);
});
```

## 🗄️ Database Schema

### Core Models

#### User

```prisma
model User {
  id                          Int       @id @default(autoincrement())
  name                        String    @db.VarChar(255)
  email                       String    @unique
  password                    String
  passwordResetToken          String?
  passwordResetTokenExpiry    String?
  token_send_at              DateTime?
  email_verified_at          DateTime?
  email_verified_token       String?
  created_at                 DateTime  @default(now())
  Clash                      Clash[]
}
```

#### Clash

```prisma
model Clash {
  id               Int              @id @default(autoincrement())
  user             User             @relation(fields: [user_id], references: [id], onDelete: Cascade)
  user_id          Int
  title            String
  description      String
  image            String
  created_at       DateTime         @default(now())
  expires_at       DateTime
  ClashItems       ClashItem[]
  ClashComments    ClashComments[]
}
```

#### ClashItem

```prisma
model ClashItem {
  id         Int      @id @default(autoincrement())
  clash      Clash    @relation(fields: [clash_id], references: [id], onDelete: Cascade)
  clash_id   Int
  image      String
  count      Int      @default(0)
  created_at DateTime @default(now())
}
```

## ⚡ Background Jobs

### Queue Processing with BullMQ

The server uses Redis-based queues for background processing:

#### Email Jobs (`emailJobs.ts`)

- **Welcome emails** - Send after user registration
- **Verification emails** - Email verification tokens
- **Password reset emails** - Password reset links
- **Notification emails** - Clash updates and reminders

#### Voting Jobs (`votingJobs.ts`)

- **Vote counting** - Process vote increments
- **Vote validation** - Prevent duplicate voting
- **Real-time updates** - Broadcast vote changes

#### Comment Jobs (`commentjob.ts`)

- **Comment processing** - Validate and store comments
- **Notification dispatch** - Notify clash creators
- **Moderation queue** - Content filtering

### Queue Configuration

```typescript
export const votingQueue = new Queue("votingQueue", {
  connection: redisConnectionOptions,
  defaultJobOptions: {
    delay: 500,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  },
});
```

## 🔒 Security Features

### Authentication & Authorization

- **JWT Tokens** - Stateless authentication with configurable expiry
- **Password Hashing** - bcrypt with salt rounds
- **Token Validation** - Middleware for protected routes
- **Refresh Tokens** - Long-lived authentication (optional)

### Input Validation

```typescript
// Example Zod validation schema
export const clashSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  expires_at: z.string().datetime(),
});
```

### Rate Limiting

- **Global limits** - Prevent API abuse
- **Route-specific limits** - Custom limits per endpoint
- **IP-based tracking** - Redis-backed counters
- **Sliding window** - Advanced rate limiting algorithm

### File Upload Security

- **File type validation** - Only allow image files
- **File size limits** - Configurable maximum file size
- **Filename sanitization** - Prevent path traversal attacks
- **Virus scanning** - Optional integration with security scanners

## 🚀 Deployment

### Production Environment Variables

```env
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@host:5432/clash_prod"
REDIS_URL="redis://user:pass@host:6379"
JWT_SECRET="production-secret-key"
EMAIL_HOST="smtp.sendgrid.net"
CORS_ORIGIN="https://your-domain.com"
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
```

### Recommended Infrastructure

- **Hosting:** AWS EC2, Railway, Render, or DigitalOcean
- **Database:** AWS RDS PostgreSQL, Supabase, or Railway
- **Redis:** AWS ElastiCache, Railway, or Redis Cloud
- **File Storage:** AWS S3, Cloudinary, or local storage
- **Email:** SendGrid, AWS SES, or Mailgun
- **Monitoring:** AWS CloudWatch, Datadog, or Sentry

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.ts
```

## 📊 Performance Monitoring

### Health Check Endpoint

```bash
GET /health
```

Response:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "services": {
    "database": "connected",
    "redis": "connected",
    "email": "operational"
  }
}
```

### Metrics & Logging

- **Request logging** - Detailed API request logs
- **Error tracking** - Comprehensive error reporting
- **Performance metrics** - Response time monitoring
- **Database queries** - Query performance analysis

## 🛠️ Development

### Code Style

- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **TypeScript** - Type safety and better developer experience
- **Husky** - Git hooks for quality assurance

### Database Management

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# View database in browser
npx prisma studio

# Deploy migrations to production
npx prisma migrate deploy
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Errors**

   - Verify PostgreSQL is running
   - Check DATABASE_URL format
   - Ensure database exists

2. **Redis Connection Errors**

   - Verify Redis server is running
   - Check Redis connection settings
   - Test Redis connection manually

3. **Email Service Errors**

   - Verify SMTP credentials
   - Check email service rate limits
   - Test email configuration

4. **File Upload Issues**
   - Check file permissions
   - Verify upload directory exists
   - Check file size limits

### Debug Mode

```bash
# Enable debug logging
DEBUG=clash:* npm run dev

# Database query logging
DEBUG=prisma:query npm run dev
```

## 📝 API Documentation

For detailed API documentation, visit the interactive Swagger documentation at:
`http://localhost:8000/api-docs` (when running in development mode)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Built with ❤️ by [Gourav Singla](https://github.com/Gourav830)**
