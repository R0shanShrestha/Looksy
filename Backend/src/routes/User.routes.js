const express = require("express");
const {
  loginController,
  signupContoller,
  profileController,
  favImage,
} = require("../controller/ContollerProvider");
const { body } = require("express-validator");
const { userAuth } = require("../middleware/middlewareProviders");

const UserRoute = express.Router();
UserRoute.post(
  "/login",
  [body("email").isEmail().withMessage("Field is required")],
  loginController
);
UserRoute.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Enter Valid Email"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be 3 character Longer"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be 5 character Longer"),
  ],
  signupContoller
);

UserRoute.get("/profile/:userId", userAuth, profileController);
UserRoute.put("/fav", userAuth, favImage);

module.exports = UserRoute;
