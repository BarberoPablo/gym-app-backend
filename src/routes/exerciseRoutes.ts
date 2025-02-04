import { NextFunction, Request, Response, Router } from "express";
import { getExercise, createExercise } from "../controllers/exerciseController";

const router = Router();

router.get("/:id", getExercise as (req: Request, res: Response, next: NextFunction) => void);
router.post("/", createExercise as (req: Request, res: Response, next: NextFunction) => void);

export default router;
