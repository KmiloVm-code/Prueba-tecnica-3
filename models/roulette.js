import mongoose from "mongoose";

const rouletteSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: {
        values: ["open", "closed"],
        message: "Status must be 'open' or 'closed'",
      },
      default: "closed",
    },
    bets: [
      {
        userName: {
          type: String,
          required: [true, "Username is required"],
        },
        betType: {
          type: String,
          enum: {
            values: ["number", "color"],
            message: "Bet type must be 'number' or 'color'",
          },
          required: [true, "Bet type is required"],
        },
        number: {
          type: Number,
          min: [1, "Number must be at least 1"],
          max: [36, "Number must be at most 36"],
          required: [
            function () {
              return this.betType === "number";
            },
            "Number is only valid when bet type is 'number'",
          ],
        },
        color: {
          type: String,
          enum: {
            values: ["red", "black"],
            message: "Color must be 'red' or 'black'",
          },
          required: [
            function () {
              return this.betType === "color";
            },
            "Color is only valid when bet type is 'color'",
          ],
        },
        amount: {
          type: Number,
          required: [true, "Amount is required"],
          min: [1, "Minimum amount is 1"],
          max: [10000, "Maximum amount is 10000"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Roulette = mongoose.model("Roulette", rouletteSchema);

export default Roulette;
