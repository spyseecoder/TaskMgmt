import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TaskProvider } from './context/TaskContext';
import Login from './components/Login';
import Home from './pages/Home';
import AddTask from './pages/AddTask';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <TaskProvider>
          <Routes>
            {/* Login Route */}
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/add-task" element={<AddTask />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TaskProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
