/* ----- DEPENDENCIES -----*/
const mongoService = require("./mongoService");
const cloudinaryService = require("./cloudinaryService");
const ObjectId = require("mongodb").ObjectId;

/* ----- CONSTANTS -----*/
const USERS_COLLECTION = "users";

module.exports = {
  query,
  add,
  addRequest,
  login,
  getById
};

FillDB();

async function FillDB() {
  let db = await mongoService.connect();
  let res = await db
    .collection(USERS_COLLECTION)
    .find({})
    .toArray();
  if (res.length === 0) addMany(_createUsers());
}

async function addMany(users) {
  let db = await mongoService.connect();
  let res = await db.collection(USERS_COLLECTION).insert(users);
  res._id = res.insertedId;
  return res;
}

async function query(currCountry, currCity) {
  let db = await mongoService.connect();
  return await db
    .collection(USERS_COLLECTION)
    .find({ country: currCountry, city: currCity })
    .toArray();
}

async function add(credentials) {
  let db = await mongoService.connect();
  let res = await db.collection(USERS_COLLECTION).insertOne(credentials);
  credentials._id = res.insertedId;
  return credentials;
}

async function addRequest(request) {
  let db = await mongoService.connect();
  db.collection(USERS_COLLECTION).updateOne(
    { _id: new ObjectId(request.userId) },
    { $push: { requests: request.info } }
  );
  return request;
}

async function login(credentials) {
  let db = await mongoService.connect();
  let res = await db.collection(USERS_COLLECTION).findOne(credentials);
  return res;
}

async function getById(id) {
  const _id = new ObjectId(id);
  let db = await mongoService.connect();
  let user = await db.collection(USERS_COLLECTION).findOne({ _id });
  let img = await cloudinaryService.loadFromCloudinary(user.imgUrl);
  user.img = img;
  return user;
}

function _createUser(
  email,
  password,
  firstName,
  lastName,
  gender,
  birthdate,
  city,
  country
) {
  return {
    email,
    password,
    firstName,
    lastName,
    gender,
    birthdate,
    isHosting: true,
    guests: [],
    requests: [],
    isSurfing: false,
    city,
    country,
    language: [],
    references: [],
    ocupation: "",
    education: "",
    maxNumOfGuests: 1,
    isLastMinReq: false,
    prefGenderToHost: "Any",
    isKidFriendly: false,
    isPetFriendly: false,
    isSmokeAllowed: false,
    hasPets: 0,
    hasChildren: 0,
    isSmoking: false,
    isWheelchairAccessible: false,
    imgs: [],
    imgUrl:
      gender === "Male"
        ? "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553430377/male-profile.png"
        : "https://res.cloudinary.com/dcl4oabi3/image/upload/v1553430382/female-profile.png"
  };
}

function _createUsers() {
  let users = [];
  users.push(
    _createUser(
      "nivordsar@gmail.com",
      "123",
      "Niv",
      "Saar",
      "Male",
      { day: 24, month: 09, year: 1997 },
      "Bangkok",
      "Thailand"
    )
  );
  users.push(
    _createUser(
      "shiriron92@gmail.com",
      "123",
      "Shiri",
      "Ron",
      "Female",
      { day: 09, month: 11, year: 1992 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "taniratz@hotmail.com",
      "123",
      "Yehonatan",
      "Ratzon",
      "Male",
      { day: 19, month: 02, year: 1993 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "jessica@gmail.com",
      "1111",
      "Jessica",
      "Turner",
      "Female",
      { day: 08, month: 09, year: 1990 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "riley@gmail.com",
      "1111",
      "Riley",
      "County",
      "Female",
      { day: 30, month: 10, year: 1992 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "chloe@gmail.com",
      "1111",
      "Chloe",
      "Edwards",
      "Female",
      { day: 11, month: 07, year: 1994 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "rob@gmail.com",
      "1111",
      "Rob",
      "Nelson",
      "Male",
      { day: 14, month: 06, year: 1988 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "rickey@gmail.com",
      "1111",
      "Rickey",
      "Powell",
      "Male",
      { day: 05, month: 02, year: 1980 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "kory@gmail.com",
      "1111",
      "Kory",
      "Turner",
      "Male",
      { day: 08, month: 09, year: 1985 },
      "Bangkok",
      "Thailand"
    )
  );
  users.push(
    _createUser(
      "karl@gmail.com",
      "1111",
      "Karl",
      "Smith",
      "Male",
      { day: 12, month: 09, year: 1989 },
      "Barcelona",
      "Spain"
    )
  );
  users.push(
    _createUser(
      "penelope@gmail.com",
      "1111",
      "Penelope",
      "Harrison",
      "Female",
      { day: 18, month: 09, year: 1980 },
      "Bangkok",
      "Thailand"
    )
  );

  return users;
}
