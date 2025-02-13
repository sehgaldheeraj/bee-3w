const Todo = require("../models/todo.model");
const addTodo = async (req, res) => {
  try {
    const { name, desc, category, state } = req.body;
    //await Todo.addTodo(name, category, state);
    const newTodo = new Todo({ name, desc, category, state }); //const obj = new Class();
    await newTodo.save();
    /**
     * await Todo.create({ name, desc, category, state });
     */
    res.send({ message: "todo added successfully" });
  } catch (err) {
    res.send({ message: err.message });
  }
};
const readTodos = async (req, res) => {
  try {
    const todos = await Todo.getTodos();
    res.render("index", { todos });
  } catch (err) {
    res.status(500).send("Server Side Error");
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Todo.updateTodo(id, status);
    res.status(201).send({ message: "todo updated successfully" });
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
  }
};
module.exports = { addTodo, readTodos, updateTodo };
