const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/Users");
const Products = require("../models/Products");

// GET
// all
router.get("/", async (req, res) => {
  const user = await Users.find();

  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});
// single user
router.get("/:id/", async (req, res) => {
  const user = await Users.findById(req.params.id);
  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
    console.error(error);
  }
});
// // get list
// router.get("/:id/list ", async (req, res) => {
//   const user = await Users.findById(req.params.id);

//   try {
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404);
//     console.error(error);
//   }
// });

// POST
// register
router.post("/register", async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  const emailValid = await Users.findOne({ email: req.body.email });
  const numberValid = await Users.findOne({ number: req.body.number });
  try {
    if (emailValid == null && numberValid == null) {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: hashPassword,
      };
      const users = await Users.create(newUser);
      await users.save();
      res.status(200).json(users);
    } else if (emailValid != null) {
      res.status(400).json({
        message:
          "Email is already registered. Make sure you use your own email.",
        status: 409,
      });
    } else if (numberValid != null) {
      res.status(409).json({
        message:
          "Number is already registered. Make sure you use your own number",
        status: 409,
      });
    } else {
      res.status(404).json({
        message: "Email and number is already registered",
        status: 404,
      });
    }
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});
// login
router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "Email not found", status: 404 });
    }
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (pass) {
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          number: user.number,
          cart: user.cart,
        },
        "sikretongmalupet"
      );
      res.status(200).json({ user: token });
    } else {
      res.status(400).json({ message: "Invalid password", status: 400 });
    }
  } catch (error) {
    res.status(404);
    console.error(error);
  }
});
// add list
router.post("/:id/list", async (req, res) => {
  const user = await Users.findById(req.params.id);
  const addList = {
    _id: req.body._id,
    name: req.body.name,
    image: req.body.image,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
  };
  try {
    await user.cart.push(addList);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
    console.error(error);
  }
});

// PUT
// delete list
router.put("/:userid/delete/:listid", async (req, res) => {
  const { userid, listid } = req.params;
  const user = await Users.findByIdAndUpdate(userid);
  user.cart = await user.cart.filter((cart) => cart._id !== listid);

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
    console.error(error);
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  const user = await Users.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(400);
    console.error(error);
  }
});

module.exports = router;
