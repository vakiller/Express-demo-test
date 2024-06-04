// import { AppDataSource } from "./database/data-source";
const express = require("express");
const dotenv = require("dotenv");
const {authRouter} = require("./routes/auth.route");
const {itemRouter} = require("./routes/item.route");
const { AppDataSource } = require("./database/data-source");
const { errorHandler } = require("./middlewares/error-handler");


dotenv.config();

const app = express();
app.use(express.json());

const { PORT = 3000 } = process.env;

// app.get("*", (req, res) => {
//   res.status(505).json({ message: "Bad Request" });
// });

app.use("/auth", authRouter);
app.use("/item", itemRouter);
app.use(errorHandler);

AppDataSource.initialize().then(async () => {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
  });
  console.log("Database Connected!!!");
})
.catch((error) => console.log(error));