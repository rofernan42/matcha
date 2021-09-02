const User = require("../models/user");
const Image = require("../models/image");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const authValidation = require("../middleware/auth-validation");
const Like = require("../models/like");

exports.getProfile = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const likes = await Like.fetchLikes(user._id);
    res.status(200).json({ user, likes });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editSettings = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  const username = req.body.data.username.trim();
  const name = req.body.data.name.trim();
  const lastname = req.body.data.lastname.trim();
  const email = req.body.data.email.trim();
  let password = req.body.data.password;
  if (password.length === 0) password = null;
  try {
    errors = await authValidation(
      username,
      name,
      lastname,
      email,
      password,
      req.userId
    );
    if (Object.keys(errors).length > 0) {
      const error = new Error("Something went wrong");
      error.error = errors;
      error.statusCode = 422;
      throw error;
    }
    user.username = username;
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    if (password) {
      const hashedPwd = await bcrypt.hash(password, 12);
      user.password = hashedPwd;
    }
    const updatedUser = new User({ ...user });
    await updatedUser.save();
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postAge = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    let age = +req.body.data;
    if (age < 18 || age > 99) {
      age = null;
    }
    user.age = age;
    const updatedUser = new User({ ...user });
    await updatedUser.save();
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postGender = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    user.gender = req.body.data;
    const updatedUser = new User({ ...user });
    await updatedUser.save();
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postAttraction = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const attr = req.body.data;
    user.attrMen = attr.men;
    user.attrWomen = attr.women;
    const updatedUser = new User({ ...user });
    await updatedUser.save();
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postBio = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    user.bio = req.body.data;
    const updatedUser = new User({ ...user });
    await updatedUser.save();
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postInterest = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const interests = req.body.data.trim().split(/\s+/);
    user.interests.push(...interests);
    const updatedUser = new User({ ...user });
    await updatedUser.save();
    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeInterest = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const intToRemove = req.body.data;
    const index = user.interests.indexOf(intToRemove);
    if (index > -1) {
      user.interests.splice(index, 1);
    }
    const updatedUser = new User({ ...user });
    await updatedUser.save();

    res.status(201).json(updatedUser);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postImage = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const images = await Image.findByUser(user._id);
    if (!images) {
      const error = new Error("Images not found");
      error.statusCode = 401;
      throw error;
    }
    const image = req.file;
    const userDir = `images/${user._id.toString()}`;
    const imageNb = +req.body.imageNb;
    if (imageNb > 4) {
      const error = new Error("Wrong index");
      error.statusCode = 422;
      throw error;
    }
    if (!image) {
      const error = new Error("Please upload a file");
      error.statusCode = 422;
      throw error;
    }
    await fs.mkdir(userDir, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Directory created successfully");
    });
    const oldImageUrl = image.path.replace("\\", "/");
    const imageUrl = userDir + "/" + image.filename;
    fs.rename(oldImageUrl, imageUrl, (err) => {
      if (err) {
        throw err;
      } else {
        console.log("File moved successfully");
      }
    });
    switch (imageNb) {
      case 0:
        if (images.image0) clearImage(images.image0);
        images.image0 = imageUrl;
        break;
      case 1:
        if (images.image1) clearImage(images.image1);
        images.image1 = imageUrl;
        break;
      case 2:
        if (images.image2) clearImage(images.image2);
        images.image2 = imageUrl;
        break;
      case 3:
        if (images.image3) clearImage(images.image3);
        images.image3 = imageUrl;
        break;
      case 4:
        if (images.image4) clearImage(images.image4);
        images.image4 = imageUrl;
        break;
    }
    const updatedImages = new Image({ ...images });
    await updatedImages.save();
    const extractedImages = Object.values(
      (({ image0, image1, image2, image3, image4 }) => ({
        image0,
        image1,
        image2,
        image3,
        image4,
      }))(updatedImages)
    );
    res.status(201).json(extractedImages);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteImage = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const images = await Image.findByUser(user._id);
    if (!images) {
      const error = new Error("Images not found");
      error.statusCode = 401;
      throw error;
    }
    const imageNb = +req.body.imageNb;
    switch (imageNb) {
      case 0:
        if (images.image0) clearImage(images.image0);
        images.image0 = null;
        break;
      case 1:
        if (images.image1) clearImage(images.image1);
        images.image1 = null;
        break;
      case 2:
        if (images.image2) clearImage(images.image2);
        images.image2 = null;
        break;
      case 3:
        if (images.image3) clearImage(images.image3);
        images.image3 = null;
        break;
      case 4:
        if (images.image4) clearImage(images.image4);
        images.image4 = null;
        break;
    }
    const updatedImages = new Image({ ...images });
    await updatedImages.save();
    const extractedImages = Object.values(
      (({ image0, image1, image2, image3, image4 }) => ({
        image0,
        image1,
        image2,
        image3,
        image4,
      }))(updatedImages)
    );
    res.status(201).json(extractedImages);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
