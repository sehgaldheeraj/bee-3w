const express = require("express");
const path = require("path");
const Todo = require("./models/todo.model");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

/**
 * Task 1: Request on base route -> view all todos
 */
app.get("/", (req, res) => res.render("index"));
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

app.listen(3000, () => {
  console.log("learning restful crud at 3000");
});
