const Product = require("../models/Product");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { name, price, brand, quantity } = req.body;
  const product = { name, price, brand, quantity };

  try {
    await Product.create(product);
    res.status(201).json({ message: "Product has been created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, price, brand, quantity, cost } = req.body;
  const product = { name, price, brand, quantity, cost };

  try {
    await Product.updateOne({ _id: id }, product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
