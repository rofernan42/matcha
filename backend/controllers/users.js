const Block = require("../models/block");
const Like = require("../models/like");
const Match = require("../models/match");
const User = require("../models/user");

exports.getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const isBlockedOrBlocking = await Block.findByUsers(
      req.userId,
      req.params.id
    );
    let resData;
    if (user._id === req.userId || isBlockedOrBlocking.length > 0)
      resData = null;
    else {
      const like = await Like.findByUsers(req.params.id, req.userId);
      const likesMe = !!like;
      const match = await Match.findByUsers(req.params.id, req.userId);
      const matchedMe = !!match;
      resData = {
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        age: user.age,
        bio: user.bio,
        interests: user.interests.length > 0 ? user.interests.split(";") : null,
        score: user.score,
        lat: user.lat,
        lon: user.lon,
        lastConnection: user.lastConnection,
        images: user.images.filter((img) => img),
        likesMe,
        matchedMe,
      };
    }
    res.status(200).json(resData);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  const users = await User.fetchUsers();
  try {
    res.status(200).json(users);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getBlockedUsers = async (req, res, next) => {
  const blockedUsers = await User.fetchBlockedUsers(req.userId);
  try {
    res.status(200).json({ users: blockedUsers });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getLikedUsers = async (req, res, next) => {
  const likedUsers = await User.fetchLikedUsers(req.userId);
  try {
    res.status(200).json({ users: likedUsers });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUsersWhoLikeMe = async (req, res, next) => {
  const usersWhoLikeMe = await User.fetchUsersWhoLikeMe(req.userId);
  try {
    res.status(200).json({ users: usersWhoLikeMe });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getVisits = async (req, res, next) => {
  const visits = await User.fetchVisits(req.userId);
  try {
    res.status(200).json({ users: visits });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getFilteredUsers = async (req, res, next) => {
  const user = await User.findById(req.userId);
  try {
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }
    const users = await User.fetchFilteredUsers(req.userId);
    const usersNotBlocked = await filterByBlockings(user, users);
    let filteredUsers = filterByAttraction(user, usersNotBlocked);
    if (req.query.minAge || req.query.maxAge) {
      filteredUsers = filterByAge(
        req.query.minAge,
        req.query.maxAge,
        filteredUsers
      );
    }
    if (req.query.minScore || req.query.maxScore) {
      filteredUsers = filterByScore(
        req.query.minScore,
        req.query.maxScore,
        filteredUsers
      );
    }
    if (req.query.minDist || req.query.maxDist) {
      filteredUsers = filterByDistance(
        req.query.minDist,
        req.query.maxDist,
        user,
        filteredUsers
      );
    }
    if (req.query.interests) {
      filteredUsers = filterByInterests(
        req.query.interests.split(";"),
        filteredUsers
      );
    }
    if (req.query.sort === "interests") {
      filteredUsers = sortByInterests(user.interests.split(";"), filteredUsers);
    } else if (req.query.sort === "age") {
      filteredUsers = sortByAge(req.query.order, filteredUsers);
    } else if (req.query.sort === "score") {
      filteredUsers = sortByScore(req.query.order, filteredUsers);
    } else {
      filteredUsers = sortByDistance(user, filteredUsers);
    }
    if (req.query.matched === "true") {
      filteredUsers = filteredUsers.filter((user) => user.matchedMe);
    }
    res.status(200).json({
      users: filteredUsers.map((user) => {
        return {
          _id: user._id,
          username: user.username,
          name: user.name,
          lastname: user.lastname,
          age: user.age,
          gender: user.gender,
          bio: user.bio,
          interests: user.interests,
          score: user.score,
          lat: user.lat,
          lon: user.lon,
          lastConnection: user.lastConnection,
          likesMe: user.likesMe,
          matchedMe: user.matchedMe,
          images: user.images.filter((img) => img),
        };
      }),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const filterByBlockings = async (user, users) => {
  const blocks = await Block.fetchByUser(user._id);
  const usersNotBlocked = users.filter(
    function (usr) {
      return this.indexOf(usr._id) < 0;
    },
    blocks.map((block) =>
      block.id_from === user._id ? block.id_towards : block.id_from
    )
  );
  return usersNotBlocked;
};

const filterByAttraction = (user, users) => {
  let filteredUsers = users;
  if (user.gender === "male") {
    if (user.attrMen && user.attrWomen) {
      filteredUsers = users.filter((usrs) => usrs.attrMen);
    }
    if (user.attrMen && !user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) =>
          (usrs.gender === "male" || usrs.gender === "other") && usrs.attrMen
      );
    } else if (!user.attrMen && user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) =>
          (usrs.gender === "female" || usrs.gender === "other") && usrs.attrMen
      );
    }
  } else if (user.gender === "female") {
    if (user.attrMen && user.attrWomen) {
      filteredUsers = users.filter((usrs) => usrs.attrWomen);
    }
    if (user.attrMen && !user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) =>
          (usrs.gender === "male" || usrs.gender === "other") && usrs.attrWomen
      );
    } else if (!user.attrMen && user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) =>
          (usrs.gender === "female" || usrs.gender === "other") &&
          usrs.attrWomen
      );
    }
  } else if (user.gender === "other") {
    if (user.attrMen && !user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) => usrs.gender === "male" || usrs.gender === "other"
      );
    } else if (!user.attrMen && user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) => usrs.gender === "female" || usrs.gender === "other"
      );
    }
  }
  return filteredUsers;
};

const sortByScore = (order, users) => {
  if (order === "increase") {
    return users.sort((a, b) => a.score - b.score);
  } else if (order === "decrease") {
    return users.sort((a, b) => b.score - a.score);
  }
  return users;
};

const filterByScore = (minScore, maxScore, users) => {
  let filteredUsers = users;
  if (minScore) {
    filteredUsers = filteredUsers.filter((usr) => usr.score >= minScore * 100);
  }
  if (maxScore && maxScore < 5) {
    filteredUsers = filteredUsers.filter((usr) => usr.score <= maxScore * 100);
  }
  return filteredUsers;
};

const sortByAge = (order, users) => {
  if (order === "increase") {
    return users.sort((a, b) => a.age - b.age);
  } else if (order === "decrease") {
    return users.sort((a, b) => b.age - a.age);
  }
  return users;
};

const filterByAge = (minAge, maxAge, users) => {
  let filteredUsers = users;
  if (minAge) {
    filteredUsers = filteredUsers.filter((usr) => usr.age && usr.age >= minAge);
  }
  if (maxAge) {
    filteredUsers = filteredUsers.filter((usr) => usr.age && usr.age <= maxAge);
  }
  return filteredUsers;
};

const calculateDistance = (latA, latB, lonA, lonB) => {
  latA = (latA * Math.PI) / 180;
  latB = (latB * Math.PI) / 180;
  lonA = (lonA * Math.PI) / 180;
  lonB = (lonB * Math.PI) / 180;
  return Math.round(
    6371 *
      Math.acos(
        Math.sin(latA) * Math.sin(latB) +
          Math.cos(latA) * Math.cos(latB) * Math.cos(lonB - lonA)
      )
  );
};

const sortByDistance = (currentUser, users) => {
  return users.sort(
    (a, b) =>
      calculateDistance(currentUser.lat, a.lat, currentUser.lon, a.lon) -
      calculateDistance(currentUser.lat, b.lat, currentUser.lon, b.lon)
  );
};

const sortByInterests = (interests, users) => {
  return users.sort((a, b) => {
    const inta = a.interests
      .split(";")
      .filter((i) => interests.indexOf(i) > -1);
    const intb = b.interests
      .split(";")
      .filter((i) => interests.indexOf(i) > -1);
    return intb.length - inta.length;
  });
};

const filterByInterests = (interests, users) => {
  return users.filter((user) => {
    const userInt = user.interests
      .split(";")
      .filter((i) => interests.indexOf(i) > -1);
    return userInt > 0;
  });
};

const filterByDistance = (minDist, maxDist, currentUser, users) => {
  let filteredUsers = users;
  if (minDist) {
    filteredUsers = filteredUsers.filter(
      (usr) =>
        calculateDistance(currentUser.lat, usr.lat, currentUser.lon, usr.lon) >=
        minDist
    );
  }
  if (maxDist) {
    filteredUsers = filteredUsers.filter(
      (usr) =>
        calculateDistance(currentUser.lat, usr.lat, currentUser.lon, usr.lon) <=
        maxDist
    );
  }
  return filteredUsers;
};
