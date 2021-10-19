const faker = require("faker");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const randomAge = () => {
  const ages = Array.from(Array(99).keys());
  return ages[Math.floor(Math.random() * ages.length)];
};

const randomGender = () => {
  const gender = ["male", "female", "other"];
  return gender[Math.floor(Math.random() * gender.length)];
};

const randomAttr = () => {
  const randomVals = [true, false];
  let attrMen = randomVals[Math.floor(Math.random() * randomVals.length)];
  const attrWomen = randomVals[Math.floor(Math.random() * randomVals.length)];
  if (attrMen === false && attrWomen === false) attrMen = true;
  return { attrMen, attrWomen };
};

const randomPics = (gender) => {
  const pics = [
    "1.jpeg",
    "2.jpeg",
    "3.jpeg",
    "4.jpeg",
    "5.jpeg",
    "6.jpeg",
    "7.jpeg",
    "8.jpeg",
    "9.jpeg",
    "10.jpeg",
    "11.jpeg",
    "12.jpeg",
    "13.jpeg",
    "14.jpeg",
  ];
  let genderPath = "men";
  if (gender === "female") genderPath = "women";
  const shuffled = pics.sort(() => 0.5 - Math.random());
  const path = `images/stock_photos/${genderPath}/`;
  return {
    image0: path + shuffled[0],
    image1: path + shuffled[1],
    image2: path + shuffled[2],
    image3: path + shuffled[3],
    image4: path + shuffled[4],
  };
};

const randomInterests = () => {
  const allInterests = [
    "cooking",
    "coding",
    "JavaScript",
    "C",
    "CPP",
    "Node",
    "React",
    "hiking",
    "cinema",
    "videogames",
    "travelling",
    "Paris",
    "42",
    "party",
    "techno",
    "piano",
    "violin",
    "guitar",
    "music",
    "beer",
    "wine",
    "beach",
    "surf",
    "paddle",
    "golf",
    "sports",
    "chest",
    "gym",
    "harrypotter",
    "coffee",
    "tea",
  ];
  const nbInterests = Math.floor(Math.random() * allInterests.length);
  const shuffled = allInterests.sort(() => 0.5 - Math.random());
  const userInterests = shuffled.slice(0, nbInterests);
  return userInterests.join(";");
};

const randomPosition = () => {
  const lat = Math.random() * (51.078447 - 42.430778 + 1) + 42.430778;
  const lon = Math.random() * 8.193373 * (Math.round(Math.random()) ? 1 : -1);
  return { lat, lon };
};
// 51.078447, 2.514316 point au nord de la France
// 42.430778, 3.082506 point au sud de la France
// 48.423458, -4.768702 point a l'ouest de la France
// 48.956056, 8.193373 point a l'est de la France

const fillDb = async (nbUsers) => {
  for (let i = 0; i < nbUsers; i++) {
    const hashedPwd = await bcrypt.hash("123456", 12);
    const age = randomAge();
    const attr = randomAttr();
    const gender = randomGender();
    const position = randomPosition();
    const images = randomPics(gender);
    const user = new User({
      username: faker.internet.userName(),
      name: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: hashedPwd,
      lat: position.lat,
      lon: position.lon,
      age: age >= 18 && age <= 99 ? age : null,
      gender: gender,
      bio: faker.lorem.paragraph(),
      interests: randomInterests(),
      score: 0.0,
      lastConnection: Date.now(),
      attrMen: attr.attrMen,
      attrWomen: attr.attrWomen,
      image0: images.image0,
      image1: images.image1,
      image2: images.image2,
      image3: images.image3,
      image4: images.image4,
    });
    await user.save();
  }
  console.log("database seeded");
};

fillDb(600);
