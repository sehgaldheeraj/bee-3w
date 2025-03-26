const express = require("express");
const User = require("./models/user.model");
const app = express();

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
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  try{
    
  }
});

app.listen(3000, () => {
  console.log("Learning cookies @ 3000");
});
