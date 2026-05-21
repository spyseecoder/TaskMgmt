import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { TaskContext } from '../context/TaskContext';
import { fetchTasks } from '../services/taskService';
import { FILTER_OPTIONS } from '../utils/constants';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import SearchBar from '../components/SearchBar';
import FilterButtons from '../components/FilterButtons';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { user } = useContext(UserContext);
  const { tasks, loading, error, setAllTasks, updateTask, deleteTask, setTaskLoading, setTaskError } = useContext(TaskContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fetch tasks on component mount (only if not already loaded)
  useEffect(() => {
    const loadTasks = async () => {
      // Only fetch if context is empty (initial load)
      if (tasks.length === 0) {
        setTaskLoading(true);
        try {
          const tasksData = await fetchTasks();
          setAllTasks(tasksData);
          setTaskError(null);
        } catch (error) {
          setTaskError(error.message);
          console.error('Failed to load tasks:', error);
        } finally {
          setTaskLoading(false);
        }
      }
    };

    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual retry when fetch fails
  const handleRetry = async () => {
    setTaskLoading(true);
    try {
      const tasksData = await fetchTasks();
      setAllTasks(tasksData);
      setTaskError(null);
    } catch (err) {
      setTaskError(err.message);
      console.error('Retry failed:', err);
    } finally {
      setTaskLoading(false);
    }
  };

  // Filter and search tasks
  useEffect(() => {
    let filtered = tasks;

    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter((task) => task.status === activeFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.task.toLowerCase().includes(query) ||
          task.assignedTo.toLowerCase().includes(query)
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, activeFilter, searchQuery]);

  // Calculate statistics
  const stats = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
    onHold: tasks.filter((t) => t.status === 'Hold').length
  };

  const handleSaveTask = (updatedTask) => {
    updateTask(updatedTask.id, {
      task: updatedTask.task,
      status: updatedTask.status,
      assignedTo: updatedTask.assignedTo
    });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  return (
    <div className="home-container">
      <Navbar />

      <main className="home-main">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h1 className="welcome-title">
            Welcome, <span className="username">{user?.name}</span> 👋
          </h1>
          <p className="welcome-subtitle">to Task Manager</p>
        </div>

        {/* Statistics Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <StatCard label="Total Tasks" count={stats.total} borderColor="default" />
            <StatCard label="In Progress" count={stats.inProgress} borderColor="in-progress" />
            <StatCard label="Completed" count={stats.completed} borderColor="completed" />
            <StatCard label="On Hold" count={stats.onHold} borderColor="on-hold" />
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="search-filter-section">
          <div className="search-filter-container">
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <FilterButtons
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              filters={FILTER_OPTIONS}
            />
          </div>
        </section>

        {/* Task Counter */}
        <div className="task-counter">
          <p>
            Showing <strong>{filteredTasks.length}</strong> of{' '}
            <strong>{tasks.length}</strong> tasks
          </p>
        </div>

        {/* Tasks Section */}
        <section className="tasks-section">
          {error && (
            <div className="error-banner">
              <p>Failed to load tasks: {error}</p>
              <button className="btn-retry" onClick={handleRetry}>Retry</button>
            </div>
          )}
          {loading ? (
            <LoadingSpinner />
          ) : filteredTasks.length > 0 ? (
            <div className="tasks-grid">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onSave={handleSaveTask}
                />
              ))}
            </div>
          ) : (
            <div className="no-tasks">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <p>No tasks found</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
