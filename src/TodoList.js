import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [currentTask, setCurrentTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, id: Date.now() }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id) => {
    const task = tasks.find(task => task.id === id);
    setCurrentTask(task.text);
    setIsEditing(id);
  };

  const handleSaveTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: currentTask } : task));
    setIsEditing(null);
    setCurrentTask('');
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        placeholder="Add a new task" 
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {isEditing === task.id ? (
              <input 
                type="text" 
                value={currentTask} 
                onChange={(e) => setCurrentTask(e.target.value)} 
              />
            ) : (
              <span>{task.text}</span>
            )}
            {isEditing === task.id ? (
              <button onClick={() => handleSaveTask(task.id)}>Save</button>
            ) : (
              <button onClick={() => handleEditTask(task.id)}>Edit</button>
            )}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
