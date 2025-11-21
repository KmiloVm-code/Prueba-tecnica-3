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