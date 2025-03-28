import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  // Adiciona uma nova tarefa
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  // Remove uma tarefa
  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Edita uma tarefa
  const editTask = (index: number, updatedTask: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  return (
    <div id="root">
      {/* Top bar */}
      <div className="top-bar">
        <div
          className={activeTab === 'Home' ? 'active' : ''}
          onClick={() => setActiveTab('Home')}
        >
          Organização
        </div>
        <div
          className={activeTab === 'About' ? 'active' : ''}
          onClick={() => setActiveTab('About')}
        >
          Tarefas
        </div>
      </div>

      {/* Content area */}
      <div className="content">
        {activeTab === 'Home' && (
          <div>
            <h1>Organização</h1>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'About' && (
          <div>
            <h1>Tarefas</h1>
            <div>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Digite uma nova tarefa"
              />
              <button onClick={addTask}>Adicionar</button>
            </div>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={task}
                    onChange={(e) => editTask(index, e.target.value)}
                  />
                  <button onClick={() => deleteTask(index)}>Excluir</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;