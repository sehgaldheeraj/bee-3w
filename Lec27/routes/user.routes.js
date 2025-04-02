const router = require("express").Router();

router.get("/register", (req, res) => {
  res.render("register");
});
//Register a new user
router.post("/register", async (req, res) => {
  const { fullname, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds
    await User.create({ fullname, email, password: hashedPassword, role });
    res.status(201).send({ msg: "User registered Successfully" });
  } catch (err) {
    res.status(500).send({ msg: err.msg });
  }
});

router.get("/login", (req, res) => res.render("login"));
//Login user
router.post("/login", async (req, res) => {
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

router.get("/messages", isAuthenticated, (req, res) => {
  res.status(200).send({ msg: "Access to messages granted" });
});

module.exports = router;
