const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const memoryStore = require("memorystore")(session);
const passport = require("./authentication/passport");
//const cookieParser = require("cookie-parser");
const User = require("./models/user.model");

const mongoose = require("mongoose");
const app = express();
const URI = "mongodb://localhost:27017/testecomW";

app.use(passport.initialize());
app.use(passport.session());
//app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000, httpOnly: true, secure: false },
    store: new memoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);

app.use(express.json());
//Register a new user
app.post("/register", async (req, res) => {
  const { fullname, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds
    await User.create({ fullname, email, password: hashedPassword, role });
    res.status(201).send({ msg: "User registered Successfully" });
  } catch (err) {
    res.status(500).send({ msg: err.msg });
  }
});

//Login user
app.post("/login", async (req, res) => {
  try {
    //const user = await User.findOne({ email: email });
    passport.authenticate("local");
    //send user details to the client
    //res.cookie("user", user);
    //req.session.user = user;
    res.status(200).send({ msg: "logged in successfully" });
  } catch (err) {
    res.status(500).send({ msg: err.msg });
  }
});

//Task: check all the login sessions inside your store
//store.all

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.status(403).send({ msg: "Unauthorized" });
  }
  next();
}

app.get("/messages", isAuthenticated, (req, res) => {
  res.status(200).send({ msg: "Access to messages granted" });
});
async function dbConnect() {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log(err.message);
  }
}
dbConnect();
app.listen(3000, () => {
  console.log("Learning cookies @ 3000");
});
