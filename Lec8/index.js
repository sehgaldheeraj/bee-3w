const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs"); //EJS: Embedded JavaScript
app.use(express.static(path.join(__dirname, "public")));
// app.get("/styles.css", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/styles.css"));
// });
app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/", (req, res) => {
//   res.end(`<h1>Welcome to Views</h1>`);
// });
app.listen(3000, () => {
  console.log("server started at port 3000");
});
