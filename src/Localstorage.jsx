import React, { useState, useEffect } from 'react';

export const Todo = () => {
  const [todos, setTodos] = useState(() => {
    // Load the todos from local storage or initialize with an empty array
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    // Save todos to local storage whenever the todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Check for duplicate task
    if (todos.some((todo) => todo.text.toLowerCase() === input.toLowerCase())) {
      alert('This task already exists!');
      return;
    }

    // Add a new todo with completed set to false
    setTodos([...todos, { text: input, id: Date.now(), completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        // Only toggle the completed status for the todo with the matching id
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    // Remove the todo with the matching id
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Simple Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
