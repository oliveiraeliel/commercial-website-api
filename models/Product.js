const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    cost: {
      type: Number,
      require: true,
      trim: true,
    },
    onSale: {
      type: Boolean,
    },
    onSalePrice: {
      type: Number,
      trim: true,
    },
    brand: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
    },
    imageURL: {
      type: String,
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

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
