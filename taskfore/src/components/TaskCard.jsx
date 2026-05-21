import React, { useState, useEffect } from 'react';
import { validateTaskName, validateAssignedUser } from '../utils/validation';
import { TASK_STATUS } from '../utils/constants';

const TaskCard = ({ task, onEdit, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    task: '',
    status: 'In Progress',
    assignedTo: ''
  });
  const [errors, setErrors] = useState({
    task: '',
    assignedTo: ''
  });

  useEffect(() => {
    setFormData({
      task: task.task,
      status: task.status,
      assignedTo: task.assignedTo || ''
    });
  }, [task]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'In Progress':
        return 'status-in-progress';
      case 'Completed':
        return 'status-completed';
      case 'Hold':
        return 'status-on-hold';
      default:
        return 'status-in-progress';
    }
  };

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

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        ...task,
        task: formData.task,
        status: formData.status,
        assignedTo: formData.assignedTo
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      task: task.task,
      status: task.status,
      assignedTo: task.assignedTo || ''
    });
    setErrors({ task: '', assignedTo: '' });
  };

  if (isEditing) {
    return (
      <div className="task-card task-card-edit-mode">
        <div className="task-card-header">
          <span className="task-id">#{task.id}</span>
        </div>

        <div className="task-card-edit-body">
          {/* Task Name Field */}
          <div className="form-group">
            <label htmlFor={`task-${task.id}`}>TASK NAME</label>
            <input
              id={`task-${task.id}`}
              name="task"
              type="text"
              value={formData.task}
              onChange={handleInputChange}
              className={errors.task ? 'input-error' : ''}
              placeholder="Enter task name"
            />
            {errors.task && <span className="error-text">{errors.task}</span>}
          </div>

          {/* Status and Assigned To Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`status-${task.id}`}>STATUS</label>
              <select
                id={`status-${task.id}`}
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

            <div className="form-group">
              <label htmlFor={`assigned-${task.id}`}>ASSIGNED TO</label>
              <input
                id={`assigned-${task.id}`}
                name="assignedTo"
                type="text"
                value={formData.assignedTo}
                onChange={handleInputChange}
                className={errors.assignedTo ? 'input-error' : ''}
                placeholder="Enter assigned user"
              />
              {errors.assignedTo && <span className="error-text">{errors.assignedTo}</span>}
            </div>
          </div>
        </div>

        <div className="task-card-footer">
          <button className="task-save-btn" onClick={handleSave}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Save
          </button>
          <button className="task-cancel-btn" onClick={handleCancel}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className="task-id">#{task.id}</span>
      </div>

      <div className="task-card-body">
        <h3 className="task-name">{task.task}</h3>

        <div className="task-info">
          <div className={`task-status ${getStatusClass(task.status)}`}>
            {task.status}
          </div>
          <div className="task-assigned">
            {task.assignedTo ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#a78bfa"
                  stroke="#a78bfa"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>{task.assignedTo}</span>
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#a78bfa"
                  stroke="#a78bfa"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="unassigned">Unassigned</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="task-card-footer">
        <button className="task-edit-btn" onClick={() => setIsEditing(true)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#ffffff"
            stroke="currentColor"
            strokeWidth="2"
            style={{ transform: 'rotate(225deg)' }}
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
          Edit
        </button>
        <button className="task-delete-btn" onClick={() => onDelete(task.id)}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
