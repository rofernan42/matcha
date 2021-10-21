const User = require("../models/user");
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
    user.lastConnection = Date.now();
    const updatedUser = new User({ ...user });
    await updatedUser.save();
    const likes = await Like.fetchLikes(user._id);
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      name: updatedUser.name,
      lastname: updatedUser.lastname,
      age: updatedUser.age,
      bio: updatedUser.bio,
      gender: updatedUser.gender,
      attrMen: updatedUser.attrMen,
      attrWomen: updatedUser.attrWomen,
      interests:
        updatedUser.interests.length > 0
          ? updatedUser.interests.split(";")
          : [],
      score: updatedUser.score,
      lat: updatedUser.lat,
      lon: updatedUser.lon,
      lastConnection: updatedUser.lastConnection,
      images: user.images,
      likes,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editSettings = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
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
    res.status(201).json({ username, name, lastname, email });
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
    res.status(201).json({ age });
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
    res.status(201).json({ gender: req.body.data });
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
    res.status(201).json({ attrMen: attr.men, attrWomen: attr.women });
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
    res.status(201).json({ bio: req.body.data });
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
    const interests = (
      user.interests +
      ";" +
      req.body.data
        .trim()
        .split(/[^A-Za-z]/)
        .join(";")
    ).split(/[\s;]+/);
    const removeDuplicates = interests.filter(
      (item, pos) => interests.indexOf(item) === pos && item.length > 0
    );
    const updatedUser = new User({
      ...user,
      interests: removeDuplicates.join(";"),
    });
    await updatedUser.save();
    res.status(201).json({ interests: removeDuplicates });
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
    const temp = user.interests.split(";");
    const index = temp.indexOf(intToRemove);
    if (index > -1) {
      temp.splice(index, 1);
    }
    const updatedUser = new User({ ...user, interests: temp.join(";") });
    await updatedUser.save();
    res.status(201).json({ interests: temp });
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
        if (user.image0) clearImage(user.image0);
        user.image0 = imageUrl;
        break;
      case 1:
        if (user.image1) clearImage(user.image1);
        user.image1 = imageUrl;
        break;
      case 2:
        if (user.image2) clearImage(user.image2);
        user.image2 = imageUrl;
        break;
      case 3:
        if (user.image3) clearImage(user.image3);
        user.image3 = imageUrl;
        break;
      case 4:
        if (user.image4) clearImage(user.image4);
        user.image4 = imageUrl;
        break;
    }
    const updatedUser = new User({ ...user });
    await updatedUser.save();
    res.status(201).json({
      images: [user.image0, user.image1, user.image2, user.image3, user.image4],
    });
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
    const imageNb = +req.body.imageNb;
    switch (imageNb) {
      case 0:
        if (user.image0) clearImage(user.image0);
        user.image0 = null;
        break;
      case 1:
        if (user.image1) clearImage(user.image1);
        user.image1 = null;
        break;
      case 2:
        if (user.image2) clearImage(user.image2);
        user.image2 = null;
        break;
      case 3:
        if (user.image3) clearImage(user.image3);
        user.image3 = null;
        break;
      case 4:
        if (user.image4) clearImage(user.image4);
        user.image4 = null;
        break;
    }
    const updatedUser = new User({ ...user });
    await updatedUser.save();
    res.status(201).json({
      images: [user.image0, user.image1, user.image2, user.image3, user.image4],
    });
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
