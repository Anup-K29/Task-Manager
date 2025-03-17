import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import './App.css'; // Import the CSS file

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>iTask - Manage your todos at one place</h1>
        <div className="add-todo">
          <h2>Add a Todo</h2>
          <div>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter a todo..."
            />
            <button onClick={handleAdd} disabled={todo.length <= 3}>
              Save
            </button>
          </div>
        </div>
        <div className="filter">
          <input
            id="show"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <label htmlFor="show">Show Finished</label>
        </div>
        <div className="todos">
          <h2>Your Todos</h2>
          {todos.length === 0 && <div className="no-todos">No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo-item">
                <div className="todo-content">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={`todo-text ${item.isCompleted ? "completed" : ""}`}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons">
                  <button onClick={(e) => handleEdit(e, item.id)}>
                    <FaEdit />
                  </button>
                  <button onClick={(e) => handleDelete(e, item.id)}>
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;