import { createRoulette } from "../controllers/roulette.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", createRoulette);

export default router;