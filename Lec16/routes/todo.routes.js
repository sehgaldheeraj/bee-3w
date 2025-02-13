const router = require("express").Router();

const {
  addTodo,
  readTodos,
  updateTodo,
} = require("../controllers/todos.controller");

router.get("/", readTodos);

router.get("/addTodo", (req, res) => res.render("addTodo"));

router.post("/", addTodo);

router.get("/updateTodo", (req, res) => res.render("updateTodo"));

router.patch("/:id", updateTodo);

module.exports = router;
