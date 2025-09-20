import { useState } from "react";
import "./todo.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  // Add new item
  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.trim() === "") return;

    setTodos([...todos, { id: Date.now(), title: newItem, completed: false }]);
    setNewItem(""); // clear input
  }

  // Toggle completed
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Delete item
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <form className="New-Item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New item</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Add
        </button>
      </form>

      <h1 className="header">To-do-list</h1>
      <ul className="list">
        {todos.length === 0 && <p>No tasks yet!</p>}
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            </label>
            <button
              className="btn btn-danger"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
