const SaveimageModel = require("../model/Saveimage.model.js");
const User = require("../model/User.model.js");

module.exports.saveimage = async (obj) => {
  try {
    // check this image already exists or not

    const isExists = await SaveimageModel.findOne({
      userId: obj.userId,
      imageId: obj.imageId,
    });
    if (isExists) {
      await SaveimageModel.deleteOne({ _id: isExists._id });

      await User.findByIdAndUpdate(obj.userId, {
        $pull: {
          savedImg: isExists._id,
        },
      });


      return { msg: "Image Unbooked !" };
    }

    // booked

    const imageCreated = await SaveimageModel.create({
      title: obj?.title,
      image: obj?.image,
      imageId: obj?.imageId,
      description: obj?.description,
      userId: obj?.userId,
    });

    if (!imageCreated) {
      return { msg: "Failed to save image" };
    }

    const user = await User.findByIdAndUpdate(obj.userId, {
      $push: { savedImg: imageCreated._id },
    });

    if (!user) {
      return { msg: "User not found" };
    }

    return { msg: "Image Booked!" };
  } catch (err) {
    // console.log(err)
    return { msg: "Server error" };
  }
};
