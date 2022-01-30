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

module.exports = router;
