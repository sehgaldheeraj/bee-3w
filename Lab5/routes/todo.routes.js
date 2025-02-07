const router = require("express").Router();
const Todo = require("../models/todo.model");

/**
 * Task 1: Request on base route -> view all todos
 */
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.getTodos();
    res.render("index", { todos });
  } catch (err) {
    res.status(500).send("Server Side Error");
  }
});
/**
 * Task 2: Addtodo view
 */
router.get("/addTodo", (req, res) => res.render("addTodo"));

/**
 * Task 3: POST /todos
 */
router.post("/todos", async (req, res) => {
  try {
    const { name, status, type } = req.body;
    await Todo.addTodo(name, status, type);
    res.send({ message: "todo added successfully" });
  } catch (err) {
    res.send({ message: err.message });
  }
});
/**
 * fetch(`http://localhost:3000/todos/:${todo.id}`)
 * 'todos/:id'
 */
router.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Todo.updateTodo(id, status);
    res.status(201).send({ message: "todo updated successfully" });
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
  }
});

module.exports = router;
