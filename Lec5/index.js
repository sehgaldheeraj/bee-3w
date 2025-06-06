//importing the dependency
const express = require("express");
//creating a server instance
const app = express();

//localhost:3000
app.get("/", (req, res) => {
  res.send("Welcome!");
}); //args - route, cb fn

//localhost:3000/home
app.get("/home", (req, res) => {
  res.send("Hi from Home");
});

//POST ex: Creating a new user
/**
 * 1. Take Data from request
 * 2. Data validation
 * 3. Add user to DB
 */
users = [];
app.post("/users", (req, res) => {
  const { name, age, email, password, phone } = req.body; // const name = req.body.name;

  //JSON -> JS obj  JSON.parse()
  console.log(req.body);
  res
    .status(201)
    .send({ users: users, message: "account created successfully" });
});
//started server as a process
app.listen(3000, () => {
  console.log("Server started successfully");
});

//CRUD Operations
/**
 * CREATE: POST
 */

//npm install nodemon --save-dev    :saves as dev dependency
