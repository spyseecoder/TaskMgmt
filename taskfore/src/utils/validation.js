// Validate name
export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required' };
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  return { isValid: true, error: '' };
};

// Validate email
export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  return { isValid: true, error: '' };
};

// Validate password
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  return { isValid: true, error: '' };
};

// Validate task name
export const validateTaskName = (taskName) => {
  if (!taskName || taskName.trim().length === 0) {
    return { isValid: false, error: 'Task name is required' };
  }
  return { isValid: true, error: '' };
};

// Validate assigned user
export const validateAssignedUser = (assignedUser) => {
  if (!assignedUser || assignedUser.trim().length === 0) {
    return { isValid: false, error: 'Please assign the task to a user' };
  }
  return { isValid: true, error: '' };
};
