import React, { useState } from 'react';
import './todo.css';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { mdiCheckOutline } from '@mdi/js';

export const Todo=()=> {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

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
      <div className='header'>
        
      <h1 className='hd'>Simple Todo List</h1>
      <form onSubmit={addTodo} className='form'>
        <input
          type="text"
          value={input}
          className='input'
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          />
        <button type="submit" className='ibtn'>Add</button>
      </form>
          </div>
      <ul className='ul'>
        {todos.map((todo) => (
          <li 
          className='li'
            key={todo.id} 
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
            <button className='bbbtn' onClick={() => toggleComplete(todo.id)}>
            <Icon path={mdiCheckOutline} size={1} />
            </button>
            <button className='bbbtn' onClick={() => removeTodo(todo.id)}><Icon path={mdiDelete} size={1} /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}


