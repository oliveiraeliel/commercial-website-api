const Operation = require("../models/Operation");
const Product = require("../models/Product");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { buyer, product, quantity } = req.body;
  const operation = { buyer, product, quantity };

  const verifyStock = await Product.findById(product);
  if (verifyStock.matchedCount === 0) {
    res.status(422).json({ message: "Invalid product" });
    return;
  }
  if (quantity > verifyStock.quantity) {
    res.status(406).json({ message: "Insufficient stock" });
    return;
  }
  const newStockQuantity = verifyStock.quantity - quantity;

  try {
    await Product.updateOne({ _id: product, quantity: newStockQuantity });
    await Operation.create(operation);
    res.status(201).json({ message: "Operation has been created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
