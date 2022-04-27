const express = require("express");
const router = express.Router();

const Products = require("../models/Products");

// GET
router.get("/", async (req, res) => {
  const product = await Products.find();

  try {
    res.status(200).json(product);
  } catch (error) {
    res.status(404);
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);

  try {
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
  }
});

// POST
router.post("/", async (req, res) => {
  const newProduct = {
    brand: req.body.brand,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  const product = await Products.create(newProduct);

  try {
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(400);
    console.error(error);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const product = await Products.findByIdAndDelete(req.params.id);

  try {
    res.status(200).json(product);
  } catch (error) {
    res.status(400);
    console.error(error);
  }
});

module.exports = router;
