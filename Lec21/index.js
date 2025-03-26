const express = require("express");
const User = require("./models/user.model");

const mongoose = require("mongoose");
const app = express();
const URI = "mongodb://localhost:27017/testecomW";

app.use(express.json());
//Register a new user
app.post("/register", async (req, res) => {
  const newUser = req.body;
  try {
    await User.create(newUser);
    res.status(201).send({ msg: "User registered Successfully" });
  } catch (err) {
    res.status(500).send({ msg: err.msg });
  }
});

//Login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }
    if (password !== user.password) {
      return res.status(401).send({ msg: "Invalid Credentials" });
    }
    //send user details to the client
    res.cookie("user", user);
    res.status(200).send({ msg: "logged in successfully" });
  } catch (err) {
    res.status(500).send({ msg: err.msg });
  }
});

function isAuthenticated(req, res, next) {
  if (!req.headers.user) {
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
