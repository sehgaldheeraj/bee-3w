const express = require("express");
const session = require("express-session");
const memoryStore = require("memorystore")(session);
const routes = require("./routes/index");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const URI = "mongodb://localhost:27017/testecomW";

app.set("view engine", "ejs");

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
app.use(express.static(path.join(__dirname, "public")));

const passport = require("./authentication/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/v1", routes);

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
