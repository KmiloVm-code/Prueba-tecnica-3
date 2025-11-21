import mongoose from "mongoose";

const rouletteSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "closed",
  },
  bets: [
    {
      userName: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["number", "color"],
        required: true,
      },
      number: {
        type: Number,
        min: 0,
        max: 36,
      },
      color: {
        type: String,
        enum: ["red", "black"],
      },
      amount: {
        type: Number,
        required: true,
        min: 1,
        max: 10000,
      },
    },
  ],
});

const Roulette = mongoose.model("Roulette", rouletteSchema);

export default Roulette;