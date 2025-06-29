import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import opportunityRoutes from "./routes/opportunityRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    origin: true, // Allow any origin for development
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Prefix all API routes with /api for clarity and to match frontend
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/auth", authRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});