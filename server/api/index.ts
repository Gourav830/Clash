import express, { Application, Response, Request, NextFunction } from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import ExpressFileUpoad from "express-fileupload";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();

// CORS configuration for Vercel
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
app.use(
  ExpressFileUpoad({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Clash Backend API is running!",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

// Routes
import routes from "../src/routes/index.js";
app.use("/", routes);

// 404 handler
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

export default app;
