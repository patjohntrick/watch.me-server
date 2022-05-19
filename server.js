const express = require("express");
const cors = require("cors");

const ProductRoute = require("./routes/Products");
const UsersRoute = require("./routes/UsersRoute");
const { urlencoded } = require("express");

const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

app.use("/users", UsersRoute);
app.use("/products", ProductRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening to port ${PORT}`));
