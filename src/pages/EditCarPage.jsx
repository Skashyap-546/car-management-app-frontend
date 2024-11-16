import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../assets/api'; // Make sure the API instance is correctly configured

const EditCarPage = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const navigate = useNavigate();

  const [car, setCar] = useState({
    title: '',
    description: '',
    tags: [],
    images: [], // Existing images
  });
  const [newImages, setNewImages] = useState([]); // New images to upload
  const [error, setError] = useState('');

  // Fetch the car details to populate the form
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        setError('Failed to fetch car details');
      }
    };

    fetchCarDetails();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({
      ...car,
      [name]: value,
    });
  };

  // Handle new images upload
  const handleImageChange = (e) => {
    setNewImages(e.target.files);
  };

  // Handle form submission to update car details
  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', car.title);
  formData.append('description', car.description);
  formData.append('tags', car.tags.join(',')); // Convert array to comma-separated string
  formData.append('existingImages', JSON.stringify(car.images)); // Convert to JSON string

  // Add new images
  Array.from(newImages).forEach((image) => formData.append('images', image));

  try {
    const token = localStorage.getItem('token');
    const response = await api.put(`/cars/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate(`/cars/${response.data._id}`);
  } catch (err) {
    setError('Failed to update car details');
  }
};


  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Car Details</h2>
      <div className="bg-white p-6 rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={car.title}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={car.description}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-700">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={car.tags.join(', ')}
              onChange={(e) => setCar({ ...car, tags: e.target.value.split(', ') })}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="images" className="block text-gray-700">
              Upload New Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="mb-4">
            <h4>Current Images</h4>
            <div className="grid grid-cols-3 gap-4">
              {car.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${image}`} // Assuming your images are served from 'uploads' directory
                  alt={`Car Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCarPage;
