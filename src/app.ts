import { PrismaClient } from "@prisma/client";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes";
import exercisesRoutes from "./routes/exerciseRoutes";
import routinesRoutes from "./routes/routineRoutes";

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
app.use("/exercises", exercisesRoutes);
app.use("/routines", routinesRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
