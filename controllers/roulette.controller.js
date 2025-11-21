import Roulette from "../models/roulette.js";

export const createRoulette = async (req, res) => {
  try {
    const newRoulette = new Roulette();
    const savedRoulette = await newRoulette.save();
    res.status(201).json(savedRoulette._id);
  } catch (error) {
    res.status(500).json({ message: "Error creating roulette", error });
  }
};

export const openRoulette = async (req, res) => {
  try {
    const { id } = req.params;
    const roulette = await Roulette.findById(id);
    if (!roulette) {
      return res.status(404).json({ message: "Roulette not found" });
    }
    if (roulette.status === "open") {
      return res.status(400).json({ message: "Roulette is already open" });
    }
    roulette.status = "open";
    await roulette.save();
    res.status(200).json({ message: "Roulette opened successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error opening roulette", error });
  }
};

export const placeBet = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, betType, number, color, amount } = req.body;
    const roulette = await Roulette.findById(id);
    if (!roulette) {
      return res.status(404).json({ message: "Roulette not found" });
    }
    if (roulette.status !== "open") {
      return res.status(400).json({ message: "Roulette is not open for bets" });
    }
    const newBet = {
      userName,
      betType,
      number,
      color,
      amount,
    };
    roulette.bets.push(newBet);
    const savedRoulette = await roulette.save();
    res.status(200).json({ message: "Bet placed successfully", roulette: savedRoulette });
  } catch (error) {
    res.status(500).json({ message: "Error placing bet", error });
  }
};
