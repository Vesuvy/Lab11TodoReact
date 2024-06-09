import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask && !tasks.some(task => task.text === newTask)) {
            const task = {
                id: Date.now(),
                text: newTask,
                isComplete: false
            };
            const newTasks = [...tasks, task];
            setTasks(newTasks);
            setFilteredTasks(newTasks);
            setNewTask('');
        } else {
            alert('Задача существует или пустое значение');
        }
    };

    const deleteTask = (id) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
        setFilteredTasks(newTasks);
    };

    const toggleTaskCompletion = (id) => {
        const newTasks = tasks.map(task => 
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
        );
        setTasks(newTasks);
        setFilteredTasks(newTasks);
    };

    const sortTasksByName = () => {
        const sortedTasks = [...filteredTasks].sort((a, b) => a.text.localeCompare(b.text));
        setFilteredTasks(sortedTasks);
    };

    const showCompletedTasks = () => {
        setFilteredTasks(tasks.filter(task => task.isComplete));
    };

    const showIncompleteTasks = () => {
        setFilteredTasks(tasks.filter(task => !task.isComplete));
    };

    const showAllTasks = () => {
        setFilteredTasks(tasks);
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
                <button className="todo_delete" onClick={() => {
                    setTasks([]);
                    setFilteredTasks([]);
                }}>-</button>
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
                {filteredTasks.map(task => (
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
