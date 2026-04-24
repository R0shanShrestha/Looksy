const mongoose = require("mongoose");
const { dbURi } = require("../config/config");

module.exports = dbConnectionState = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB error:", err));
};
