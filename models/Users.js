const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`App is connected to the DB with users collection`));

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
    cart: Array,
    createdAt: String,
    updatedAt: String,
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
