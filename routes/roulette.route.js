import { createRoulette, openRoulette, placeBet, closeRoulette } from "../controllers/roulette.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", createRoulette);
router.patch("/:id/open", openRoulette);
router.post("/:id/bet", placeBet);
router.patch("/:id/close", closeRoulette);

export default router;