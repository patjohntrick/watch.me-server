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

router.get("/:id", async (req, res) => {
  const product = await Products.find(req.params.id);

  try {
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
  }
});

// POST
// add product
router.post("/", async (req, res) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
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


// PUT
// put description
router.put("/:id", async (req, res) => {
  const product = await Products.findByIdAndUpdate(req.params.id);
  product.description = req.body.description;

  try {
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(400);
    console.log(error);
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
