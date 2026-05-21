import React, { useState, useEffect } from 'react';
import { validateTaskName, validateAssignedUser } from '../utils/validation';
import { TASK_STATUS } from '../utils/constants';

const EditTaskModal = ({ task, onSave, onCancel }) => {
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
    if (task) {
      setFormData({
        task: task.task,
        status: task.status,
        assignedTo: task.assignedTo || ''
      });
    }
  }, [task]);

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
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="task-id">#{task?.id}</span>
        </div>

        <div className="modal-body">
          {/* Task Name Field */}
          <div className="form-group">
            <label htmlFor="task">TASK NAME</label>
            <input
              id="task"
              name="task"
              type="text"
              value={formData.task}
              onChange={handleInputChange}
              className={errors.task ? 'input-error' : ''}
            />
            {errors.task && <span className="error-text">{errors.task}</span>}
          </div>

          {/* Status and Assigned To Row */}
          <div className="form-row">
            {/* Status Field */}
            <div className="form-group">
              <label htmlFor="status">STATUS</label>
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
              <label htmlFor="assignedTo">ASSIGNED TO</label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                placeholder="Enter username"
                value={formData.assignedTo}
                onChange={handleInputChange}
                className={errors.assignedTo ? 'input-error' : ''}
              />
              {errors.assignedTo && (
                <span className="error-text">{errors.assignedTo}</span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-save" onClick={handleSave}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Save
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            <svg
              width="14"
              height="14"
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
    </div>
  );
};

export default EditTaskModal;
