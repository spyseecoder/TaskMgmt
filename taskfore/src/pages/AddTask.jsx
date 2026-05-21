import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import { validateTaskName, validateAssignedUser } from '../utils/validation';
import { TASK_STATUS } from '../utils/constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddTask = () => {
  const navigate = useNavigate();
  const { tasks, addTask } = useContext(TaskContext);

  const [formData, setFormData] = useState({
    task: '',
    status: TASK_STATUS.IN_PROGRESS,
    assignedTo: ''
  });

  const [errors, setErrors] = useState({
    task: '',
    assignedTo: ''
  });

  const nextTaskId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      task: '',
      assignedTo: ''
    };

    const taskValidation = validateTaskName(formData.task);
    if (!taskValidation.isValid) {
      newErrors.task = taskValidation.error;
    }

    const assignedValidation = validateAssignedUser(formData.assignedTo);
    if (!assignedValidation.isValid) {
      newErrors.assignedTo = assignedValidation.error;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTask = {
      id: nextTaskId,
      task: formData.task,
      status: formData.status,
      assignedTo: formData.assignedTo
    };

    addTask(newTask);
    navigate('/home');
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div className="add-task-container">
      <Navbar />

      <main className="add-task-main">
        <div className="add-task-content">
          <div className="add-task-header">
            <h1>Add New Task</h1>
            <p>Fill in the details to create a new task</p>
          </div>

          <div className="add-task-wrapper">
            <form className="add-task-form" onSubmit={handleAddTask}>
            {/* Task Name Field */}
            <div className="form-group">
              <label htmlFor="task">TASK NAME *</label>
              <input
                type="text"
                id="task"
                name="task"
                placeholder="Describe the task..."
                value={formData.task}
                onChange={handleInputChange}
                className={errors.task ? 'input-error' : ''}
              />
              {errors.task && <span className="error-text">{errors.task}</span>}
            </div>

            {/* Status Field */}
            <div className="form-group">
              <label htmlFor="status">STATUS *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value={TASK_STATUS.IN_PROGRESS}>
                  {TASK_STATUS.IN_PROGRESS}
                </option>
                <option value={TASK_STATUS.COMPLETED}>
                  {TASK_STATUS.COMPLETED}
                </option>
                <option value={TASK_STATUS.ON_HOLD}>
                  {TASK_STATUS.ON_HOLD}
                </option>
              </select>
            </div>

            {/* Assigned To Field */}
            <div className="form-group">
              <label htmlFor="assignedTo">ASSIGN TO *</label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                placeholder="Enter team member's name"
                value={formData.assignedTo}
                onChange={handleInputChange}
                className={errors.assignedTo ? 'input-error' : ''}
              />
              {errors.assignedTo && (
                <span className="error-text">{errors.assignedTo}</span>
              )}
            </div>

            {/* Task ID Display */}
            <div className="task-id-info">
              <p>Task ID will be: <span className="task-id-value">#{nextTaskId}</span></p>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="submit" className="btn-add-task">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Task
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddTask;
