const express = require("express");

const app = express();
//If our guard is just outside the class
// app.post('/classroomW', (req, res)=>{
//     const userIdCard = req.body;
//     if(userIdCard.uniRollNo === true){
//         return res.send({msg: "Welcome to the classroom"});
//     }
//     res.send({msg: "50 rupay ka fine"});
// })

function guardMiddleware(req, res, next) {
  const userIdCard = req.body;
  if (userIdCard.uniRollNo === "false") {
    return res.send({ msg: "50 rupay ka fine" });
  } else {
    next();
  }
}

function laptopMiddleware(req, res, next){}

app.post("/classroomW", guardMiddleware, laptopMiddleware, (req, res) => {
  res.send({ msg: "Welcome to classroom of W" });
});
app.post("/classroomX", guardMiddleware, (req, res) => {
    res.send({ msg: "Welcome to classroom of W" });
  });

express.listen(3000, () => {
  console.log("Learning middlewares @ 3000");
});
