const Operation = require("../models/Operation");
const Product = require("../models/Product");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { buyer, product, quantity, unityCost, unityPrice } = req.body;

  const stock = await Product.findById(product);
  if (stock.matchedCount === 0) {
    res.status(422).json({ message: "Invalid product" });
    return;
  }
  if (quantity > stock.quantity) {
    res.status(406).json({ message: "Insufficient stock" });
    return;
  }
  const newStockQuantity = stock.quantity - quantity;
  const totalPayed = unityPrice * quantity;
  const totalProfit = totalPayed - quantity * stock.cost;

  const operation = { buyer, product, quantity, unityPrice, totalPayed, totalProfit, unityCost };

  try {
    await Promise.all([
      Product.updateOne(
        { _id: product },
        { quantity: newStockQuantity },

      ),
      Operation.create(operation),
    ]).then(() => {
      res.status(201).json({ message: "Operation has been created" });
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/total", async (req, res) => {
  try {
    const operations = await Operation.find();
    let total = 0;
    operations.map((row) => {
      total += row.totalPayed;
    });
    res.json({ totalEarned: total });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const operations = await Operation.find();
    res.status(200).json(operations);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
