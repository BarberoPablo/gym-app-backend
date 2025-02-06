import { NextFunction, Request, Response, Router } from "express";
import { createRoutine, /* getRoutine, */ getUserRoutines } from "../controllers/routineController";

const router = Router();

/* router.get("/:id", getRoutine as (req: Request, res: Response, next: NextFunction) => void); */
router.get("/user/:id", getUserRoutines as (req: Request, res: Response, next: NextFunction) => void);
router.post("/", createRoutine as (req: Request, res: Response, next: NextFunction) => void);

export default router;
