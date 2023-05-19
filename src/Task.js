import React, { useState } from 'react';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  // 'tasks' state manages the array of tasks
  const [newTask, setNewTask] = useState('');
  // 'newtask' state stores the value of input field for adding new task
  const [filterOption, setFilterOption] = useState('all');
  // 'filterOption' state stores currently selected filter options

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

//event handlers: handleInputchange, addTask, completeTask, editTask, deleteTask, clearCompletedTasks

  // Event handler for adding a new task
  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = { id: Date.now(), name: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask('');
  };

    // Event handler for toggling the completion status of a task
  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if(task.id === id){
        return {...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // conditional rendering: taskList component renders the list of tasks

    // Event handler for editing the name of a task
  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((task) => {
      if(task.id === id){
        return {...task, name: newName };
      }
      return task;
  });
    setTasks(updatedTasks);
  };

    // Event handler for deleting a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks);
  };

    // Event handler for clearing all completed tasks from the task list
  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

    // Filtering the tasks based on the selected filter option
  const filteredTasks = tasks.filter((task) => {
    if (filterOption === 'all') return true;
    if (filterOption === 'completed') return task.completed;
    if (filterOption === 'incomplete') return !task.completed;
    return true;
  });

  return (
<div className="container">
      <h1 className="heading">ToDo List App</h1>
      <div className="add-task-form">
        <input
          type="text"
          placeholder="Enter task name"
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filter-tasks">
        <label>
          <input
            type="radio"
            value="all"
            checked={filterOption === 'all'}
            onChange={() => setFilterOption('all')}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="completed"
            checked={filterOption === 'completed'}
            onChange={() => setFilterOption('completed')}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            value="incomplete"
            checked={filterOption === 'incomplete'}
            onChange={() => setFilterOption('incomplete')}
          />
          Incomplete
        </label>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={`task${task.completed ? ' completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
            />
            <input
              type="text"
              value={task.name}
              onChange={(e) => editTask(task.id, e.target.value)}
            />
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="btn-clear-completed" onClick={clearCompletedTasks}>
        Clear Completed
      </button>
    </div>
);
};
      
export default Task;