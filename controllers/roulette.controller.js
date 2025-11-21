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
    const roulette = await Roulette.findByIdAndUpdate(
      id,
      { status: "open" },
      { new: true }
    );
    if (!roulette) {
      return res.status(404).json({ message: "Roulette not found" });
    }
    res.status(200).json({ message: "Roulette opened successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error opening roulette", error });
  }
};