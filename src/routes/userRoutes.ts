import { NextFunction, Request, Response, Router } from "express";
import { getUsers, syncUser } from "../controllers/userController";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

router.get("/", getUsers);
//not necessary for now router.get("/refresh_token", authenticateToken, getUsers);
router.post("/sync", syncUser as (req: Request, res: Response, next: NextFunction) => void); // Sync users with Google

export default router;
