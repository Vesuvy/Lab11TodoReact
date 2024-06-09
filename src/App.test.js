import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('ToDo App', () => {
    test('renders home page content', () => {
        render(<App />);
        expect(screen.getByText('Список Дел')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(6); // 4 фильтра + добавить + удалить все
        expect(screen.getByPlaceholderText('Новая задача...')).toBeInTheDocument();
        expect(screen.getByText('Всего задач:')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument(); // Initially 0 tasks
    });

    test('input field works correctly', () => {
        render(<App />);
        const input = screen.getByPlaceholderText('Новая задача...');
        const addButton = screen.getByText('+');

        fireEvent.change(input, { target: { value: 'Новое задание' } });
        fireEvent.click(addButton);

        expect(screen.getByText('Новое задание')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument(); // Now there should be 1 task
    });

    test('displays empty and filled task list', () => {
        render(<App />);
        const taskList = screen.getByText('Всего задач:');

        // Initially, the task list should be empty
        expect(taskList.nextSibling.textContent).toBe('0');

        // Add a task
        const input = screen.getByPlaceholderText('Новая задача...');
        const addButton = screen.getByText('+');
        fireEvent.change(input, { target: { value: 'Новое задание' } });
        fireEvent.click(addButton);

        // Now the task list should contain one task
        expect(screen.getByText('Новое задание')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('filter and sort buttons work correctly', () => {
        render(<App />);
        const input = screen.getByPlaceholderText('Новая задача...');
        const addButton = screen.getByText('+');
        const sortButton = screen.getByText('Сортировать по наименованию');
        const showCompletedButton = screen.getByText('Показать сделанные');
        const showIncompleteButton = screen.getByText('Показать несделанные');
        const showAllButton = screen.getByText('Показать все');

        // Add tasks
        fireEvent.change(input, { target: { value: 'Task B' } });
        fireEvent.click(addButton);
        fireEvent.change(input, { target: { value: 'Task A' } });
        fireEvent.click(addButton);
        fireEvent.change(input, { target: { value: 'Task C' } });
        fireEvent.click(addButton);

        // Initially, all tasks should be displayed
        expect(screen.getByText('Task A')).toBeInTheDocument();
        expect(screen.getByText('Task B')).toBeInTheDocument();
        expect(screen.getByText('Task C')).toBeInTheDocument();

        // Sort tasks by name
        fireEvent.click(sortButton);
        const tasks = screen.getAllByText(/Task [A-C]/);
        expect(tasks[0].textContent).toBe('Task A');
        expect(tasks[1].textContent).toBe('Task B');
        expect(tasks[2].textContent).toBe('Task C');

        // Mark Task B as complete
        const checkboxes = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxes[1]);

        // Show completed tasks
        fireEvent.click(showCompletedButton);
        expect(screen.queryByText('Task A')).toBeNull();
        expect(screen.getByText('Task B')).toBeInTheDocument();
        expect(screen.queryByText('Task C')).toBeNull();

        // Show incomplete tasks
        fireEvent.click(showIncompleteButton);
        expect(screen.getByText('Task A')).toBeInTheDocument();
        expect(screen.queryByText('Task B')).toBeNull();
        expect(screen.getByText('Task C')).toBeInTheDocument();

        // Show all tasks
        fireEvent.click(showAllButton);
        expect(screen.getByText('Task A')).toBeInTheDocument();
        expect(screen.getByText('Task B')).toBeInTheDocument();
        expect(screen.getByText('Task C')).toBeInTheDocument();
    });
});
