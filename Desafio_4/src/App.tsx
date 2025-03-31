import { useState } from "react";
import "./App.css";

interface Task {
  name: string;
  completed: boolean;
}

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState("");

  // Adiciona uma nova tarefa
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Remove uma tarefa
  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Edita uma tarefa
  const saveTask = () => {
    if (editingIndex !== null && editingTask.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].name = editingTask;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditingTask("");
    }
  };

  // Alterna o status de uma tarefa
  const toggleTaskStatus = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div id="root">
      {/* Top bar */}
      <div className="top-bar">
        <div
          className={activeTab === "Home" ? "active" : ""}
          onClick={() => setActiveTab("Home")}
        >
          Organização
        </div>
        <div
          className={activeTab === "About" ? "active" : ""}
          onClick={() => setActiveTab("About")}
        >
          Tarefas
        </div>
      </div>

      {/* Content area */}
      <div className="content">
        {activeTab === "Home" && (
          <div>
            <h1>Organização</h1>
            <div>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Digite uma nova tarefa"
              />
              <button onClick={addTask}>Adicionar</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Tarefa</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.completed ? "Concluída" : "Pendente"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "About" && (
          <div>
            <h1>Tarefas</h1>
            <table>
              <thead>
                <tr>
                  <th>Tarefa</th>
                  <th>Status</th>
                  <th className="theadOpicoes">Opções</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          value={editingTask}
                          onChange={(e) => setEditingTask(e.target.value)}
                        />
                      ) : (
                        task.name
                      )}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskStatus(index)}
                      />
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <>
                          <button onClick={saveTask}>Salvar</button>
                          <button onClick={() => setEditingIndex(null)}>
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingIndex(index);
                              setEditingTask(task.name);
                            }}
                          >
                            Editar
                          </button>
                          <button onClick={() => deleteTask(index)}>
                            Excluir
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
