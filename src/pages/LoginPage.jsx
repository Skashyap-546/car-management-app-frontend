import React, { useState } from 'react';
import api from '../assets/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData); // Call the backend login endpoint
      const { token } = response.data;

      // Save the token in localStorage for authenticated requests
      localStorage.setItem('token', token);

      // Redirect the user to the car list page on successful login
      navigate('/cars');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Do not have an account?{' '}
          <a href="/register" className="text-blue-600 underline">
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
