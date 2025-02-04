import { NextFunction, Request, Response, Router } from "express";
import { getUsers, syncUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/sync", syncUser as (req: Request, res: Response, next: NextFunction) => void); // Sync users with Google

export default router;
