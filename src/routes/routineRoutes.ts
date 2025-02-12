import { NextFunction, Request, Response, Router } from "express";
import { createRoutine, getUserRoutines } from "../controllers/routineController";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

router.get("/me", authenticateToken, getUserRoutines as (req: Request, res: Response, next: NextFunction) => void);
router.post("/", authenticateToken, createRoutine as (req: Request, res: Response, next: NextFunction) => void);

export default router;
