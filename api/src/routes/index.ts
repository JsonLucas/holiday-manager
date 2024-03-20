import { Router } from "express";
import { userRouter } from "./user";
import { holidayRouter } from "./holiday";

export const router = Router();
router.use(userRouter);
router.use(holidayRouter);