import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask && !tasks.some(task => task.text === newTask)) {
            const task = {
                id: Date.now(),
                text: newTask,
                isComplete: false
            };
            setTasks([...tasks, task]);
            setNewTask('');
        } else {
            alert('Задача существует или пустое значение');
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
        ));
    };

    const sortTasksByName = () => {
        setTasks([...tasks].sort((a, b) => a.text.localeCompare(b.text)));
    };

    const showCompletedTasks = () => {
        setTasks(tasks.filter(task => task.isComplete));
    };

    const showIncompleteTasks = () => {
        setTasks(tasks.filter(task => !task.isComplete));
    };

    const showAllTasks = () => {
        setTasks([...tasks]);
    };

    return (
        <div className="container">
            <h1>Список Дел</h1>
            <div className="input-container">
                <input
                    type="text"
                    className="text"
                    placeholder="Новая задача..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="todo_add" onClick={addTask}>+</button>
                <button className="todo_delete" onClick={() => setTasks([])}>-</button>
            </div>
            <div className="todo_tasks-count">
                <span>Всего задач:</span>
                <strong>{tasks.length}</strong>
            </div>
            <div className="todo-options">
                <button onClick={sortTasksByName}>Сортировать по наименованию</button>
                <button onClick={showCompletedTasks}>Показать сделанные</button>
                <button onClick={showIncompleteTasks}>Показать несделанные</button>
                <button onClick={showAllTasks}>Показать все</button>
            </div>
            <div className="todo_list">
                {tasks.map(task => (
                    <div key={task.id} className={`todo_task ${task.isComplete ? 'todo_task_complete' : ''}`}>
                        <label className="todo_checkbox">
                            <input
                                type="checkbox"
                                checked={task.isComplete}
                                onChange={() => toggleTaskCompletion(task.id)}
                            />
                            <div className="todo_checkbox-div"></div>
                        </label>
                        <div className="todo_task-text">{task.text}</div>
                        <div className="todo_task-delete" onClick={() => deleteTask(task.id)}>-</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
