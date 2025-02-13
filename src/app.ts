import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import exercisesRoutes from "./routes/exerciseRoutes";
import routinesRoutes from "./routes/routineRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// CORS
const allowedOrigins = ["http://localhost:3000", "https://mi-frontend.com"];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allows requests without an origin (like in Postman requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/exercises", exercisesRoutes);
app.use("/routines", routinesRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
