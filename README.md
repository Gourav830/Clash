
Clash - Image Comparison & Anonymous Messaging Platform

Clash is a web application designed to allow users to compare two photos based on likes, send anonymous messages, and manage user authentication securely. It leverages modern web technologies for high performance, scalability, and real-time interaction.

🚀 Features

📸 Photo Comparison - Post two images and let users vote on their favorite.

💬 Anonymous Messaging - Users can send messages without revealing their identity.

🔐 Secure Authentication - Email verification during registration and a "Forgot Password" feature.

⚡ Queue Processing - Uses BullMQ for background tasks like email notifications.

📩 Email System - Nodemailer integration for sending verification and password reset emails.

🗃️ Caching & Performance - Redis for caching and quick data access.

🌎 Real-time Communication - Socket.io for instant messaging.

🛠️ Tech Stack

Frontend

Framework: Next.js

Styling: Tailwind CSS

Authentication: NextAuth.js

Real-time: Socket.io-client

Backend

Server: Node.js, Express.js

Database: PostgreSQL (via Prisma ORM)

Queue Management: BullMQ (Redis-based)

Email Service: Nodemailer

Security: Helmet, Express-rate-limit

📦 Installation

1️⃣ Clone the Repository

 git clone https://github.com/Gourav830/Clash.git
 cd Clash

2️⃣ Setup Environment Variables

Create a .env file in the root directory and add the following:

PORT=3000
DATABASE_URL=your_postgres_connection_string
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

3️⃣ Install Dependencies

Backend

cd backend
npm install

Frontend

cd frontend
npm install

4️⃣ Run the Application

Backend

cd backend
npm run dev

Frontend

cd frontend
npm run dev

Now visit http://localhost:3000 to view the application.

📤 Deployment

Docker Setup

To run Clash with Docker:

docker-compose up --build

Production Deployment

Frontend: Deploy on Vercel

Backend: Deploy on AWS EC2, Railway, or Render

Database: Use a managed PostgreSQL service

🤝 Contributing

We welcome contributions! Please fork the repository and submit a pull request with your improvements.

📄 License

This project is licensed under the MIT License.

🚀 Built by Gourav Singla


