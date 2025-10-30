import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Inicio from './views/ini';
import About from './views/about';
import Contact from './views/contact';
import Login from './views/login';
import Signup from './views/signup';
import Home from './views/auth/home';
import Settings from './views/auth/settings';
import Navbar from './navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <hr />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Signup />
          }
        />

        {/* Rutas protegidas */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
