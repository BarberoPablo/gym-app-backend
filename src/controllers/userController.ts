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
    console.log("syncUser called"); // Log para depuración
    const { access_token } = req.body;

    if (!access_token) {
      console.error("Access token is missing");
      return res.status(401).json({ error: "Access token is required" });
    }

    // Supabase authenticated user
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(access_token);

    if (error || !user) {
      console.error("Error getting user from Supabase:", error);
      return res.status(401).json({ error: "Invalid or expired access token" });
    }

    // Search or create user in database
    let existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          id: user.id,
          username: user.email!.split("@")[0],
          email: user.email!,
          avatar: user.user_metadata.avatar_url || null,
        },
      });
    } else {
      console.log("User already exists in the database:", existingUser);
    }

    // Set cookies from server
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.status(200).json({ message: "User synced successfully", user: existingUser });
  } catch (err) {
    console.error("Error syncing user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
