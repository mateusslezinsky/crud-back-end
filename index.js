require("dotenv").config();
require("./start/db")();

const express = require("express");
const app = express();
const cors = require("cors");

const userRouter = require("./routes/user");

app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);

app.listen(process.env.PORT || 8000, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
