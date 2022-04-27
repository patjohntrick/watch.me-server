const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    console.log(`App is connected to the DB with products collections`)
  );

const productsSchema = mongoose.Schema({
  brand: String,
  name: String,
  image: String,
  price: Number,
  descriptio: String,
});

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
