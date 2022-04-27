const express = require("express");
const cors = require("cors");

const Users = require("./models/Users");
const Products = require("./models/Products");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const user = await Users.find();

  try {
    res.status(200).json(user);
  } catch (error) {
    res.status(404);
    console.log(error);
  }
});
app.post("/users", async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cart: req.body.cart,
  };
  const users = await Users.create(newUser);

  try {
    await users.save();
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening to port ${PORT}`));
