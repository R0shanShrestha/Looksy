const mongoose = require("mongoose");
const { dbURi } = require("../config/config");

module.exports = dbConnectionState = async () => {
  return await mongoose.connect(dbURi);
};
