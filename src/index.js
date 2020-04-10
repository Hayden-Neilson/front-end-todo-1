import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import ToDoItem from "./todoItem";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: "",
      todos: [],
    };
  }

  deleteitem = (id) => {
    fetch(`https://hjn-flask-todo-api.herokuapp.com/todo/${id}`, {
      method: "DELETE",
    }).then(
      this.setState({
        todos: this.state.todos.filter((item) => {
          return item.id !== id;
        }),
      })
    );
  };
  renderToDos = () => {
    return this.state.todos.map((item) => {
      return (
        <ToDoItem key={item.id} item={item} deleteitem={this.deleteitem} />
      );
    });
  };

  addToDo = (e) => {
    e.preventDefault();
    axios
      .post("https://hjn-flask-todo-api.herokuapp.com/todo", {
        title: this.state.todo,
        done: false,
      })
      .then((res) => {
        this.setState({
          todos: [res.data, ...this.state.todos],
          todo: "",
        });
      })
      .catch((err) => console.log("add todo Error:", err));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    axios
      .get("https://hjn-flask-todo-api.herokuapp.com/todos")
      .then((res) => {
        this.setState({
          todos: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="app">
        <h1>ToDo List</h1>
        <form className="add-todo" onSubmit={this.addToDo}>
          <input
            type="text"
            placeholder="Add ToDo"
            name="todo"
            onChange={(e) => this.handleChange(e)}
            value={this.state.todo}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderToDos()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
