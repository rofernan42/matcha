const Match = require("../models/match");
const User = require("../models/user");

const NB_USERS_PER_PAGE = 3;

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

exports.getMatches = async (req, res, next) => {
  const matches = await Match.fetchMatches(req.userId);
  const usersMatched = matches.map((users) => {
    if (users.user1.toString() === req.userId) {
      return users.user2;
    }
    return users.user1;
  });
  const resMacthes = await Promise.all(usersMatched.map(async (userId) => {
      const user = await User.findById(userId);
      return user;
  }));
  try {
    res.status(200).json({ users: resMacthes });
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
        (usrs) => usrs.gender === "male" && usrs.attrMen
      );
    } else if (!user.attrMen && user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) => usrs.gender === "female" && usrs.attrMen
      );
    }
  } else if (user.gender === "female") {
    if (user.attrMen && user.attrWomen) {
      filteredUsers = users.filter((usrs) => usrs.attrWomen);
    }
    if (user.attrMen && !user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) => usrs.gender === "male" && usrs.attrWomen
      );
    } else if (!user.attrMen && user.attrWomen) {
      filteredUsers = users.filter(
        (usrs) => usrs.gender === "female" && usrs.attrWomen
      );
    }
  }
  return filteredUsers;
};

const sortByAge = (order, users) => {
  if (order === "asc") {
    return users.sort((a, b) => a.age - b.age);
  }
  return users.sort((a, b) => b.age - a.age);
};

const filterByAgeInterval = (ageMin, ageMax, users) => {
  return users.filter(
    (usr) => usr.age && usr.age >= ageMin && usr.age <= ageMax
  );
};

const paginate = (array, perPage, currentPage) => {
  return array.slice((currentPage - 1) * perPage, currentPage * perPage);
};
