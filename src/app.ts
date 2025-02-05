import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import cors from "cors";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/users", userRoutes);
app.use("/exercises", exerciseRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
