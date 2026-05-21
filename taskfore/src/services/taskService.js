import { TASK_STATUS, API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

const STORAGE_KEY = 'taskmanagement_tasks';
const INITIAL_FETCH_KEY = 'taskmanagement_initial_fetch';

// Transform API response to application format
export const transformTaskResponse = (apiTasks) => {
  return apiTasks.map((task) => ({
    id: task.id,
    task: task.title,
    status: task.completed ? TASK_STATUS.COMPLETED : TASK_STATUS.IN_PROGRESS,
    assignedTo: ''
  }));
};

// Fetch tasks from JSONPlaceholder API
const fetchFromAPI = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.TODOS}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const apiTasks = await response.json();
    return transformTaskResponse(apiTasks);
  } catch (error) {
    throw new Error(`Error fetching from API: ${error.message}`);
  }
};

// Fetch tasks - checks localStorage first, then API on initial load
export const fetchTasks = async () => {
  try {
    // Check if tasks already exist in localStorage (from previous session or additions)
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    
    // If no cached tasks, fetch from API (initial load)
    const apiTasks = await fetchFromAPI();
    
    // Save to localStorage for future use
    saveTasks(apiTasks);
    
    // Mark that initial fetch has been done
    localStorage.setItem(INITIAL_FETCH_KEY, 'true');
    
    return apiTasks;
  } catch (error) {
    // If API fails and no cache, throw error
    throw new Error(`Error fetching tasks: ${error.message}`);
  }
};

// Save tasks to localStorage
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

// Refresh tasks from API (manual refresh)
export const refreshTasks = async () => {
  try {
    const apiTasks = await fetchFromAPI();
    saveTasks(apiTasks);
    return apiTasks;
  } catch (error) {
    throw new Error(`Error refreshing tasks: ${error.message}`);
  }
};
