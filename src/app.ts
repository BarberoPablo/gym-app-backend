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
    origin: "http://localhost:3000", // Permite solicitudes desde el frontend
    credentials: true, // Permite el envío de cookies y encabezados de autenticación
  })
);

app.use(express.json());
app.use("/users", userRoutes);
app.use("/exercises", exerciseRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
