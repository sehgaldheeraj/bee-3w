const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const Todo = require("./models/todo.model");
const routes = require("./routes/index");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
/**
 * new todo create: POST "/v1/todos"
 * read all todos : GET  "/v1/todos"
 * update a todo  : PATCH"/v1/todos"
 * addTodoView    : GET  "/v1/todos/addTodo"
 * updateTodoView : GET  "/v1/todos/updateTodo"
 */
app.use("/v1", routes);

app.listen(3000, () => {
  console.log("learning restful crud at 3000");
});
