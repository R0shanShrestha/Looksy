const { login, signUp, userProfile } = require("./user.controller");

module.exports = {
  loginController: login,
  signupContoller: signUp,
  profileController: userProfile,
};
