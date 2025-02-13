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
    //const todos = await Todo.getTodos();
    const todos = await Todo.find(); //db.todos.find()
    //const
    console.log(todos);
    res.render("index", { todos });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
/**
 * localhost:3000/v1/todos/2318naj12432 GET
 * '/v1/todos'     -> getAllTodos []
 * '/v1/todos/:id' -> readTodoById  {}
 */
const readTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    //name: abc
    //const todo = await Todo.findOne({name: name})
    //const todo = await Todo.findOne({id: id});
    res.send({ todo: todo });
  } catch (err) {
    res.status(500).send("Server Side Error");
  }
};

const updateTodoView = (req, res) => {
  const { id } = req.params;
  res.render("updateTodo", { id });
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    //await Todo.updateTodo(id, status);
    await Todo.findByIdAndUpdate(id, { status: status });
    //await Todo.findOneAndUpdate({name: name}, { status: status });
    res.status(201).send({ message: "todo updated successfully" });
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
  }
};
module.exports = { addTodo, readTodos, updateTodo };
