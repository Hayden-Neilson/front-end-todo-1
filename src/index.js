import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import ToDoItem from './todoItem';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: "",
      todos: []
    }

  }
  renderToDos = () => {
    return this.state.todos.map(item => {
      return (<ToDoItem key={item.id} item={item} />
      )
    })
  }

  addToDo = (e) => {
    e.preventDefault();
    console.log("added todo");
  }


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    axios.get("https://hjn-flask-todo-api.herokuapp.com/todos")
      .then((res) => {
        this.setState({
          todos: res.data
        })
      })
      .catch((err) => {
        console.log(err)
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
            onChange={e => this.handleChange(e)}
            value={this.state.todo}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderToDos()}
      </div>
    );
  }

}


ReactDOM.render(<App />, document.getElementById('root'));

