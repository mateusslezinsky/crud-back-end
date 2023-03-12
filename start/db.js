const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_HOST)
    .then(() => console.log("Connected at mongoose"));
};
