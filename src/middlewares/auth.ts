import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload;
    }
  }
}

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  console.log({ SECRET_KEY });
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];
  console.log({ token });
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    console.log({ decoded });
    req.user = decoded; // Asegúrate de que `user` esté definido en `Request`
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token." });
  }
}
