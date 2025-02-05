import { PrismaClient } from "@prisma/client";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import exerciseRoutes from "./routes/exerciseRoutes";
import userRoutes from "./routes/userRoutes";

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
