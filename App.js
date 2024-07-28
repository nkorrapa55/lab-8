import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tasks, setTasks] = useState([
    
  ]);

  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      text: taskText,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setTaskText(taskToEdit.text);
    handleDeleteTask(id);
  };

  return (
    <div className="app">
      <h1>TODO LIST</h1>
      <div className="task-input">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="tasks">
        {tasks.map(task => (
          <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={task.completed} onChange={() => {
              const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t);
              setTasks(updatedTasks);
            }} />
            <span>{task.text}</span>
            <span>{task.date}</span>
            <button onClick={() => handleDeleteTask(task.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button onClick={() => handleEditTask(task.id)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
