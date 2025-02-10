const fs = require("fs/promises");
const path = require("path");
const todosDB = path.join(__dirname, "todos.json");

class Todo {
  static addTodo = (name, type, status) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fs.readFile(todosDB);
        const todos = JSON.parse(data); //JSON -> JS obj
        const newTodo = {
          id: todos.length + 1,
          name: name,
          type: type,
          status: status,
        };
        todos.push(newTodo);
        await fs.writeFile(todosDB, JSON.stringify(todos));
        resolve(todos);
      } catch (err) {
        reject(err);
      }
    });
  };
  static getTodos = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fs.readFile(todosDB);
        const todos = JSON.parse(data);
        resolve(todos);
      } catch (err) {
        reject(err);
      }
    });
  };
  static updateTodo = (id, status) => {
    return new Promise(async (resolve, reject) => {
      try {
        //read data
        const data = await fs.readFile(todosDB);
        const todos = JSON.parse(data);
        //update
        const todoIdx = todos.findIndex((todo) => todo.id === id);
        todos[todoIdx].status = status;
        //write data
        await fs.writeFile(todosDB, JSON.stringify(todos));
        resolve(todos);
      } catch (err) {
        reject(err);
      }
    });
  };
  //TODO: Implement Deletion Logic
  static deleteTodo = () => {};
}
module.exports = Todo;
