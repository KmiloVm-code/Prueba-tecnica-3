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

export const closeRoulette = async (req, res) => {
  try {
    const { id } = req.params;
    const roulette = await Roulette.findById(id);
    if (!roulette) {
      return res.status(404).json({ message: "Roulette not found" });
    }
    if (roulette.status !== "open") {
      return res.status(400).json({ message: "Roulette is not open" });
    }
    roulette.status = "closed";
    // Logic to determine the result and update bets goes here
    const winningNumber = Math.floor(Math.random() * 36) + 1;
    const winningColor = winningNumber % 2 === 0 ? "red" : "black";
    roulette.result = {
      number: winningNumber,
      color: winningColor,
    };
    // Update the state and amountWon for each bet based on the result
    roulette.bets.forEach((bet) => {
      if (bet.betType === "number" && bet.number === winningNumber) {
        bet.state = "won";
        bet.amountWon = bet.amount * 5;
      } else if (bet.betType === "color" && bet.color === winningColor) {
        bet.state = "won";
        bet.amountWon = bet.amount * 1.8;
      } else {
        bet.state = "lost";
        bet.amountWon = 0;
      }
    });
    await roulette.save();
    res.status(200).json({ message: "Roulette closed successfully", result: roulette.result, bets: roulette.bets });
  } catch (error) {
    res.status(500).json({ message: "Error closing roulette", error });
  }
};

export const getAllRoulettes = async (req, res) => {
  try {
    const roulettes = await Roulette.find();
    res.status(200).json(roulettes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roulettes", error });
  }
};