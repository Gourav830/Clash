# Clash - Image Comparison & Anonymous Messaging Platform

Clash is a modern web application that allows users to create image comparison battles where visitors can vote on their favorite images. The platform features real-time voting, anonymous commenting, secure authentication, and comprehensive user management. Built with cutting-edge technologies for scalability and performance.

## 🚀 Features

### Core Features

- 📸 **Image Battles** - Create clashes with two competing images for users to vote on
- ⚡ **Real-time Voting** - Live vote counting with instant updates using Socket.io
- 💬 **Anonymous Comments** - Users can comment on battles without revealing identity
- 📊 **Live Results** - Real-time vote tallies with animated counters
- 🔗 **Share Battles** - Copy shareable links for any clash
- ⏰ **Timed Battles** - Set expiration dates for your image battles

### Authentication & Security

- 🔐 **Secure Authentication** - JWT-based authentication with NextAuth.js
- 📧 **Email Verification** - Verify accounts during registration
- 🔑 **Password Reset** - Secure forgot password functionality with email tokens
- 🛡️ **Rate Limiting** - Protection against spam and abuse
- 🔒 **Secure Headers** - Helmet.js for security best practices

### Technical Features

- ⚡ **Queue Processing** - BullMQ for background tasks and email processing
- 📧 **Email System** - Nodemailer integration for automated emails
- 🗃️ **Caching & Performance** - Redis for caching and session management
- 🌐 **Real-time Communication** - Socket.io for live updates
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🐳 **Docker Support** - Complete containerization for easy deployment

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS with Radix UI components
- **Authentication:** NextAuth.js v4
- **Real-time:** Socket.io-client
- **State Management:** React hooks and context
- **UI Components:** Radix UI primitives with custom styling
- **Icons:** Lucide React icons
- **Animations:** Tailwind CSS animations

### Backend

- **Runtime:** Node.js with Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Queue Management:** BullMQ (Redis-based)
- **Real-time:** Socket.io server
- **Email Service:** Nodemailer
- **File Upload:** Express-fileupload with Multer
- **Security:** Helmet, Express-rate-limit, CORS
- **Authentication:** JWT tokens
- **Validation:** Zod schema validation

### Infrastructure

- **Database:** PostgreSQL (Production-ready)
- **Cache/Queue:** Redis (Session storage & job queues)
- **File Storage:** Local file system (configurable for cloud storage)
- **Email:** SMTP (configurable with any provider)

## 📁 Project Structure

```
Clash/
├── front-end/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/              # Next.js app router pages
│   │   ├── components/       # Reusable UI components
│   │   ├── lib/              # Utility functions and configurations
│   │   ├── actions/          # Server actions
│   │   └── fetch/            # API fetch functions
│   ├── public/               # Static assets
│   └── package.json
│
├── server/                   # Express.js backend application
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── config/          # Database and service configurations
│   │   ├── jobs/            # Background job processors
│   │   ├── validations/     # Zod validation schemas
│   │   └── views/           # Email templates (EJS)
│   ├── prisma/              # Database schema and migrations
│   ├── public/              # File uploads and static assets
│   └── package.json
│
├── dockerCMD.txt            # Docker commands and setup
└── README.md               # This file
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Redis server
- Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Gourav830/Clash.git
cd Clash
```

### 2️⃣ Environment Variables

Create `.env` files in both `server/` and `front-end/` directories:

#### Server Environment (`server/.env`)

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/clash_db"

# JWT & Authentication
JWT_SECRET="your-super-secret-jwt-key"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Redis Configuration
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379

# Email Configuration
EMAIL_HOST="smtp.your-provider.com"
EMAIL_PORT=587
EMAIL_USER="your-email@domain.com"
EMAIL_PASS="your-email-password"

# Server Configuration
PORT=8000
NODE_ENV="development"
```

#### Frontend Environment (`front-end/.env.local`)

```env
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# API Base URL
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
```

### 3️⃣ Install Dependencies

#### Install server dependencies:

```bash
cd server
npm install
```

#### Install frontend dependencies:

```bash
cd ../front-end
npm install
```

### 4️⃣ Database Setup

#### Run Redis (using Docker):

```bash
docker run -d --name redis-server -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

#### Setup PostgreSQL database and run migrations:

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### 5️⃣ Run the Application

#### Start the backend server:

```bash
cd server
npm run dev
```

#### Start the frontend (in a new terminal):

```bash
cd front-end
npm run dev
```

The application will be available at:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **Redis Admin:** http://localhost:8001 (optional)

## 🚀 Usage Guide

### Creating Your First Clash

1. **Register/Login** - Create an account or sign in
2. **Dashboard** - Navigate to your dashboard
3. **Create Clash** - Click "Create Clash" and fill in:
   - Title for your battle
   - Description of what you're comparing
   - Cover image for the clash
   - Expiration date
4. **Add Images** - Upload two images to compete against each other
5. **Share** - Copy the shareable link to let others vote

### Voting & Engagement

1. **View Clashes** - Browse active clashes
2. **Vote** - Click on your preferred image
3. **Comment** - Leave anonymous feedback
4. **Real-time Updates** - Watch votes update live

### Managing Your Clashes

- **Edit** - Modify clash details before expiration
- **Delete** - Remove clashes you've created
- **View Results** - See live vote counts and comments
- **Share** - Get shareable links for social media

## 🐳 Docker Deployment

### Development with Docker Compose

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

#### Recommended Infrastructure:

- **Frontend:** Vercel, Netlify, or AWS Amplify
- **Backend:** AWS EC2, Railway, Render, or DigitalOcean
- **Database:** AWS RDS PostgreSQL, Supabase, or Railway
- **Redis:** AWS ElastiCache, Railway, or Redis Cloud
- **File Storage:** AWS S3, Cloudinary, or similar

## 📊 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Clash Endpoints

- `GET /api/clash` - Get user's clashes
- `POST /api/clash` - Create new clash
- `GET /api/clash/:id` - Get clash details
- `PUT /api/clash/:id` - Update clash
- `DELETE /api/clash/:id` - Delete clash
- `POST /api/clash/items` - Add images to clash

### Real-time Events (Socket.io)

- `clashing-{clashId}` - Vote updates
- `clashing_comment-{clashId}` - New comments

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for password security
- **Rate Limiting** - Prevent abuse and spam
- **Input Validation** - Zod schema validation
- **CORS Protection** - Cross-origin request security
- **Helmet Security** - Security headers middleware
- **File Upload Validation** - Image type and size validation

## ⚡ Performance Optimizations

- **Redis Caching** - Fast data retrieval
- **Background Jobs** - Queue-based email processing
- **Image Optimization** - Next.js automatic image optimization
- **Database Indexing** - Optimized Prisma queries
- **Real-time Updates** - Efficient Socket.io communication
- **Code Splitting** - Dynamic imports for better loading

## 🧪 Testing

```bash
# Run server tests
cd server
npm test

# Run frontend tests
cd front-end
npm test

# Run end-to-end tests
npm run test:e2e
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Prisma](https://prisma.io/) for the excellent database toolkit
- [Radix UI](https://radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Socket.io](https://socket.io/) for real-time communication

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Gourav830/Clash/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

<div align="center">

**Built with ❤️ by [Gourav Singla](https://github.com/Gourav830)**

[⭐ Star this repository](https://github.com/Gourav830/Clash) if you find it helpful!

</div>
