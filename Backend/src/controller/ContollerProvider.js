const { login, signUp, userProfile, saveImgTOProfile } = require("./user.controller");

module.exports = {
  loginController: login,
  signupContoller: signUp,
  profileController: userProfile,
  favImage: saveImgTOProfile
};
