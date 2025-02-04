import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function syncUser(req: Request, res: Response) {
  try {
    console.log("syncUser called"); // Log para verificar que la función se está ejecutando
    const { access_token } = req.body;

    if (!access_token) {
      console.error("Access token is missing"); // Log para verificar si falta el token
      return res.status(400).json({ error: "Access token is required" });
    }

    // Obtener el usuario autenticado desde Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(access_token);

    if (error || !user) {
      console.error("Error getting user from Supabase:", error);
      return res.status(400).json({ error: "Error getting user from Supabase" });
    }

    // Buscar el usuario en la base de datos
    let existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          id: user.id,
          username: user.email!.split("@")[0], // Username basado en el email
          email: user.email!,
          avatar: user.user_metadata.avatar_url || null,
        },
      });
    } else {
      console.log("User already exists in the database:", existingUser); // Log para verificar si el usuario ya existe
    }

    return res.json({ message: "User synced successfully", user: existingUser });
  } catch (err) {
    console.error("Error syncing user:", err); // Log para capturar errores inesperados
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
