import { createRoulette, openRoulette, placeBet, closeRoulette, getAllRoulettes } from "../controllers/roulette.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getAllRoulettes);
router.post("/", createRoulette);
router.patch("/:id/open", openRoulette);
router.post("/:id/bet", placeBet);
router.patch("/:id/close", closeRoulette);

export default router;