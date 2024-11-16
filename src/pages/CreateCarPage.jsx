import React, { useState } from 'react';
import api from '../assets/api'; // Assuming the api instance is set up for backend calls
import { useNavigate } from 'react-router-dom';

const AddCarPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    images: [],
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({ ...prevData, images: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('tags', formData.tags);
    for (let i = 0; i < formData.images.length; i++) {
      formDataToSend.append('images', formData.images[i]);
    }

    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      setError('User is not authenticated. Please log in.');
      return;
    }

    try {
      await api.post('/cars', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });
      navigate('/cars'); // Redirect to car list page after successful creation
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Car</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Car Title"
          onChange={handleChange}
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Car Description"
          onChange={handleChange}
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="tags"
          value={formData.tags}
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCarPage;
