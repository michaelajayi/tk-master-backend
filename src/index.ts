import express from "express";
import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import { NODE_ENV } from "./interfaces/global.interface";
import eventRoutes from "./routes/event.routes";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", eventRoutes);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("🎉 Welcome to the TK-Master backend service...");
});

// Catch-all for 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (optional but recommended)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === NODE_ENV.DEVELOPMENT ? err.message : undefined,
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
