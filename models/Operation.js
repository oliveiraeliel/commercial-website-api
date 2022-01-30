const mongoose = require("mongoose");

const operationSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

const Operation = mongoose.model("Operation", operationSchema);
module.exports = Operation;
