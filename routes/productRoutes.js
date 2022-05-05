const Product = require("../models/Product");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const onSale = false;
  const { name, price, brand, cost, quantity } = req.body;
  const product = { name, price, cost, brand, quantity, onSale };

  try {
    const p = await Product.create(product);
    res.status(201).json({ product_id: p._id });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/image", async (req, res) => {
  const { image, _id } = req.body;

  try {
    const imgURL = await Product.updateOne({ _id: _id }, { imageURL: image });
    res.send(200).json({ imgURL: imgURL });
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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/", async (req, res) => {
  const { _id, name, price, brand, quantity, cost, onSale, onSalePrice } =
    req.body;
  const product = { name, price, brand, quantity, cost, onSale, onSalePrice };

  try {
    await Product.updateOne({ _id: _id }, product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
