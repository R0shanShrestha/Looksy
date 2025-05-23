const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 4000,
  dbURi: process.env.MONGO_URI + "/looksy",
  JWTKEY: process.env.JWT_KEY
};
