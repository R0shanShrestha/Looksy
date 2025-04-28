const { JWTKEY } = require("../config/config");
const User = require("../model/User.model");
const jwt = require("jsonwebtoken");

module.exports.userAuth = async (req, res, next) => {
  const token = req.cookies.authToken.split(" ")[1];
  const userId = req.params.userId;
  console.log(token);
  if (!token) {
    return res.status(401).json({ msg: "Token Not Found" });
  }

  const verifyToken = jwt.verify(token, JWTKEY);
  if (!verifyToken) {
    return res.status(401).json({ msg: "Invalid Token" });
  }

  //   if (verifyToken._id != userId) {
  //     return res.status(401).json({ msg: "Unauthorized User" });
  //   }

  const validId = await User.findById({ _id: verifyToken._id });
  if (!validId) {
    return res.status(401).json({ msg: "Unauthorized User" });
  }

  req.id = verifyToken._id

  next();
};
