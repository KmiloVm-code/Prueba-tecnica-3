import { createRoulette, openRoulette } from "../controllers/roulette.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", createRoulette);
router.patch("/:id/open", openRoulette);

export default router;