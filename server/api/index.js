import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "https://clash-singla.vercel.app",
      "http://localhost:3000",
      process.env.CLIENT_APP_URL || "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Clash Backend API is running on Vercel!",
    status: "success",
    timestamp: new Date().toISOString(),
    environment: "production",
  });
});

// Basic API endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Fallback basic routes for testing
app.get("/api/auth/check", (req, res) => {
  res.json({ message: "Auth endpoint working", status: "success" });
});

app.post("/api/auth/login", (req, res) => {
  res.json({ message: "Login endpoint working", status: "success" });
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
    availableRoutes: ["/", "/api/health", "/api/auth/check", "/api/auth/login"],
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

export default app;
