const express = require("express");
const app = express();
app.use(express.json());
const students = [];
app.post("/student", (req, res) => {
  const studentData = req.body;
  students.push(studentData);
  res.send({ msg: "user registered successfully", rollno: students.length });
});
function guardMiddleware(req, res, next) {
  if (!req.body.rollno) {
    return res.send({ msg: "Not permitted in class" });
  }
  next();
}
app.get("/", (req, res) => res.send("welcome"));
app.post("/classroomW", guardMiddleware, (req, res) => {
  res.send({ msg: "welcome to class W" });
});

app.listen(3000);
