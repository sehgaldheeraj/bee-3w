const mongoose = require("mongoose");

//create a schema instance
const todosSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String, //unique: true
  category: { type: String, default: "Others" },
  state: { type: String, default: "pending" },
  time: { Date, default: Date.now },
});
//create a model class
const Todo = mongoose.model("Todo", todosSchema);

module.exports = Todo;
