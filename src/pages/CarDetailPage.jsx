import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../assets/api';

const CarDetailPage = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch car details
  const fetchCarDetails = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to view car details.');
      return;
    }

    try {
      const response = await api.get(`/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setCar(response.data); // Set the car data in the state
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch car details');
    }
  };

  // Fetch car details when the component mounts
  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Car Details</h2>

      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold">{car.title}</h3>
        <p className="mt-2">{car.description}</p>
        <p className="text-gray-500 mt-2">{car.tags}</p>

        <div className="mt-4">
          <h4 className="font-semibold">Images:</h4>
          <div className="grid grid-cols-3 gap-4">
            {car.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/uploads/${image}`} // Ensure correct path
                alt={`Car Image ${index + 1}`}
                className="w-full h-48 m-5 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => navigate(`/cars/edit/${car._id}`)} // Redirect to edit page
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Edit Car
          </button>
          <button
            onClick={async () => {
              const token = localStorage.getItem('token');
              try {
                await api.delete(`/cars/${car._id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                navigate('/cars'); // Redirect to car list after deletion
              } catch (err) {
                setError(err.response?.data?.error || 'Failed to delete car');
              }
            }}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Delete Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
