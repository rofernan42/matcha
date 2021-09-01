const Match = require("../models/match");
const User = require("../models/user");

const NB_USERS_PER_PAGE = 10;

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

exports.getFilteredUsers = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = NB_USERS_PER_PAGE;
  const user = await User.findById(req.userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }
  const users = await User.fetchFilteredUsers(req.userId);
  let filteredUsers = filterByAttraction(user, users);
  if (req.query.minAge || req.query.maxAge) {
    filteredUsers = filterByAge(req.query.minAge, req.query.maxAge, filteredUsers);
  }
  if (req.query.minScore || req.query.maxScore) {
    console.log("filter by score");
  }
  const totalItems = filteredUsers.length;
  const fetchedUsers = paginate(filteredUsers, perPage, currentPage);
  try {
    res.status(200).json({ users: fetchedUsers, totalItems, perPage });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const filterByAttraction = (user, users) => {
  let filteredUsers = users;
  if (user.gender === "male") {
    if (user.attrMen && user.attrWomen) {
      filteredUsers = users.filter((usrs) => usrs.attrMen);
    }
    if (user.attrMen && !user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) => (usrs.gender === "male" || usrs.gender === "other") && usrs.attrMen
      );
    } else if (!user.attrMen && user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) => (usrs.gender === "female" || usrs.gender === "other") && usrs.attrMen
      );
    }
  } else if (user.gender === "female") {
    if (user.attrMen && user.attrWomen) {
      filteredUsers = users.filter((usrs) => usrs.attrWomen);
    }
    if (user.attrMen && !user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) => (usrs.gender === "male" || usrs.gender === "other") && usrs.attrWomen
      );
    } else if (!user.attrMen && user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) => (usrs.gender === "female" || usrs.gender === "other") && usrs.attrWomen
      );
    }
  }
  return filteredUsers;
};

const filterByAge = (minAge, maxAge, users) => {
  let filteredUsers = users;
  if (minAge) {
    filteredUsers = filteredUsers.filter(
      (usr) => usr.age && usr.age >= minAge
    );
  }
  if (maxAge) {
    filteredUsers = filteredUsers.filter(
      (usr) => usr.age && usr.age <= maxAge
    );
  }
  return filteredUsers;
}

const sortByAge = (order, users) => {
  if (order === "asc") {
    return users.sort((a, b) => a.age - b.age);
  }
  return users.sort((a, b) => b.age - a.age);
};

const paginate = (array, perPage, currentPage) => {
  return array.slice((currentPage - 1) * perPage, currentPage * perPage);
};
