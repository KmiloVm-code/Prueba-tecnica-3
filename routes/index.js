import { Router } from "express";
import rouletteRouter from "./roulette.route.js";

const router = Router();

router.use("/roulette", rouletteRouter);

export default router;