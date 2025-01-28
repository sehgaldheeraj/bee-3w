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
}
module.exports = Todo;
