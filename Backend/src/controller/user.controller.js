const { validationResult } = require("express-validator");
const User = require("../model/User.model");

// Login Controller
module.exports.login = async (req, res, next) => {
  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    return res.status(401).json({ error: isError.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ msg: "Invalid Credientials !" });
  }

  const checkPassword = await user.compairPassword(password);
  if (!checkPassword) {
    return res.status(401).json({ msg: "Invalid Credientials !" });
  }

  const token = await user.jwtToken();
  res.cookie("authToken", `bearer ${token}`);

  res.status(200).json({ authToken: `bearer ${token}`, user: user });
};

// Register Controller
module.exports.signUp = async (req, res, next) => {
  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    return res.status(401).json({ error: isError.array() });
  }

  const { email, username, password } = req.body;

  let checkemail = await User.findOne({ email: email });

  if (checkemail) {
    return res.status(409).json({ msg: "Email already exists!" });
  }

  let HashPassword = await User.hashPassword(password);

  let createUser = await User.create({
    email,
    password: HashPassword,
    username,
  });

  if (!createUser) {
    return res.status(500).json({ msg: "Internal Server Error !" });
  }
  const token = await createUser.jwtToken();
  res.cookie("authToken", `bearer ${token}`);

  res.status(201).json({ authtoken: `bearer ${token}`, user: createUser });
};

// Profile Controller
module.exports.userProfile = async (req, res, next) => {
  const userId = req.params.userId;

  if (req.id != userId) {
    return res.status(401).json({ msg: "Unauthozied User" });
  }

  const user = await User.findById({ _id: userId });

  if (!user) {
    return res.status(401).json({ msg: "Unauthozied User" });
  }

  res.send(user);
};

// Update userDetails Controller
module.exports.userProfile = async (req, res, next) => {
  const userId = req.params.userId;

  if (req.id != userId) {
    return res.status(401).json({ msg: "Unauthozied User" });
  }

  const { username } = req.body;

  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { username: username } }
  );

  if (!user) {
    return res.status(401).json({ msg: "Unauthozied User" });
  }

  res.send(user);
};

// update userSave images fields

module.exports.saveImgTOProfile = async (req, res, next) => {
  if (!req.id) {
    return res.status(401).json({ msg: "Unauthozied User" });
  }

  const { imageUri } = req.body;

  const user = await User.findByIdAndUpdate(
    { _id: req.id },
    {
      $push: {
        savedImg: {
          saveImg: imageUri,
        },
      },
    }
  );

  if (!user) {
    return res.status(401).json({ msg: "Unauthozied User" });
  }

  res.status(200).json({ msg: "Added to Fav" });
};
