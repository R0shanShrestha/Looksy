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
  
  try {
    const isError = validationResult(req);

    if (!isError.isEmpty()) {
      return res.status(400).json({ error: isError.array() });
    }

    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ msg: "Email already exists!" });
    }

    const hashedPassword = await User.hashPassword(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = await newUser.jwtToken();

    res.cookie("authToken", `Bearer ${token}`, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      authtoken: `Bearer ${token}`,
      user: {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err.message);
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
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
module.exports.upDateuserProfile = async (req, res, next) => {
  const userId = req.params.userId;

  if (req.id != userId) {
    return res.status(401).json({ msg: "Unauthozied User" });
  }

  const { username } = req.body;

  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { username: username } },
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
    },
  );

  if (!user) {
    return res.status(401).json({ msg: "Unauthozied User" });
  }

  res.status(200).json({ msg: "Added to Fav" });
};
