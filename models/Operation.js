const mongoose = require("mongoose");

const operationSchema = mongoose.Schema(
  {
    buyer: {
      type: String,
      require: true,
    },
    product: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    unityCost: {
      type: Number,
      require: true,
      trim: true,
    },
    unityPrice: {
      type: Number,
      require: true,
      trim: true,
    },
    totalPayed: {
      type: Number,
      require: true,
      trim: true,
    },
    totalProfit: { 
      type: Number,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Operation = mongoose.model("Operation", operationSchema);
module.exports = Operation;
