import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CarListPage from './pages/CarListPage';
import AddCarPage from './pages/CreateCarPage';
import CarDetailPage from './pages/CarDetailPage';
import EditCarPage from './pages/EditCarPage'; // Import EditCarPage
import Navbar from './components/Navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is logged in by looking for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes (Login & Signup) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage/>} />

        {/* Redirecting to Login page if user is not authenticated */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/cars" /> : <Navigate to="/login" />}
        />

        {/* Protected Routes (Require Navbar and authentication) */}
        <Route
          path="/cars"
          element={isAuthenticated ? (
            <>
              <Navbar />
              <CarListPage />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />

        <Route
          path="/add-car"
          element={isAuthenticated ? (
            <>
              <Navbar />
              <AddCarPage />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />

        <Route
          path="/cars/:id"
          element={isAuthenticated ? (
            <>
              <Navbar />
              <CarDetailPage />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />

        {/* Route for editing car */}
        <Route
          path="/cars/edit/:id"
          element={isAuthenticated ? (
            <>
              <Navbar />
              <EditCarPage />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </Router>
  );
};

export default App;
