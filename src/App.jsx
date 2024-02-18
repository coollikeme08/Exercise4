import React, { useState } from 'react';

function TodoList({ setCompletedTasks, completedTasks }) {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const addTask = () => {
    if (inputValue.trim() !== '') {
      if (editIndex === -1) {
        // Add new task
        setTasks([...tasks, { name: inputValue, completed: false }]);
      } else {
        // Update existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].name = inputValue;
        setTasks(updatedTasks);
        setEditIndex(-1); // Reset edit index
      }
      setInputValue(''); // Clear input field
    }
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    // If the task being edited is removed, reset edit index
    if (index === editIndex) {
      setEditIndex(-1);
    }
  };

  const editTask = index => {
    setInputValue(tasks[index].name);
    setEditIndex(index);
  };

  const completeTask = index => {
    const completedTask = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const updateTask = () => {
    if (inputValue.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].name = inputValue;
      setTasks(updatedTasks);
      setInputValue('');
      setEditIndex(-1); // Reset edit index
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button onClick={addTask}>{editIndex === -1 ? 'Add Task' : 'Update Task'}</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name}{' '}
            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => removeTask(index)}>Delete</button>
            <button onClick={() => completeTask(index)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompletedTasks({ completedTasks }) {
  return (
    <div>
      <h1>Completed Tasks</h1>
      <ul>
        {completedTasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('todo');
  const [completedTasks, setCompletedTasks] = useState([]);

  return (
    <div>
      <button onClick={() => setActiveTab('todo')}>Todo List</button>
      <button onClick={() => setActiveTab('completed')}>Completed Tasks</button>
      {activeTab === 'todo' && (
        <TodoList setCompletedTasks={setCompletedTasks} completedTasks={completedTasks} />
      )}
      {activeTab === 'completed' && (
        <CompletedTasks completedTasks={completedTasks} />
      )}
    </div>
  );
}

export default App;