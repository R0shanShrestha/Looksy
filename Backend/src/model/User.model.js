const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWTKEY } = require("../config/config");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    savedImg: {
      type: [
        {
          saveImg: { type: String },
        },
      ],
    },
  },
  { timestamps: true }
);

UserSchema.methods.jwtToken = function () {
  return jwt.sign({ _id: this._id }, JWTKEY, { expiresIn: "1w" });
};

UserSchema.methods.compairPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 12);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
