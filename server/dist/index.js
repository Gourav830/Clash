import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import ExpressFileUpoad from "express-fileupload";
import { createServer } from "http";
const PORT = process.env.PORT || 7000;
import * as path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
//
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
// Only create Socket.io in development or when not on Vercel
let io;
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_APP_URL,
        },
    });
    // Import and setup socket only if io is created
    import("./socket.js").then(({ setupSocket }) => {
        if (io)
            setupSocket(io);
    });
}
export { io };
// *middleware
app.use(cors({
    origin: [
        "https://clash-singla.vercel.app",
        "http://localhost:3000",
        process.env.CLIENT_APP_URL || "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(helmet());
app.use(ExpressFileUpoad({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
// * Set Queue - only in development
if (process.env.NODE_ENV !== "production") {
    import("./jobs/index.js");
}
// Health check endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Clash Backend API is running!",
        status: "success",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
    });
});
// *Routes
import routes from "./routes/index.js";
app.use("/", routes);
// 404 handler
app.all("*", (req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.originalUrl,
        method: req.method,
    });
});
// For local development
if (!process.env.VERCEL) {
    server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}
// Export for Vercel
export default app;
