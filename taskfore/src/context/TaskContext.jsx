import React, { createContext, useState, useCallback } from 'react';
import { saveTasks } from '../services/taskService';

// Create the context
export const TaskContext = createContext();

// Context provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set tasks
  const setAllTasks = useCallback((taskList) => {
    setTasks(taskList);
    saveTasks(taskList);
  }, []);

  // Add task
  const addTask = useCallback((newTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [newTask, ...prevTasks];
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, []);

  // Update task
  const updateTask = useCallback((taskId, updatedData) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, []);

  // Delete task
  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, []);

  // Set loading state
  const setTaskLoading = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  // Set error state
  const setTaskError = useCallback((errorMsg) => {
    setError(errorMsg);
  }, []);

  const value = {
    tasks,
    loading,
    error,
    setAllTasks,
    addTask,
    updateTask,
    deleteTask,
    setTaskLoading,
    setTaskError
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
