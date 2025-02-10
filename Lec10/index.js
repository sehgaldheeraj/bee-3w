const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const Todo = require("./models/todo.model");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/**
 * Task 1: Request on base route -> view all todos
 */
app.get("/", async (req, res) => {
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
app.get("/addTodo", (req, res) => res.render("addTodo"));

/**
 * Task 3: POST /todos
 */
app.post("/todos", async (req, res) => {
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
app.get("/updateTodo/:id", (req, res) => res.render("updateTodo", { id }));

app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Todo.updateTodo(id, status);
    res.status(201).send({ message: "todo updated successfully" });
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
  }
});

app.listen(3000, () => {
  console.log("learning restful crud at 3000");
});
