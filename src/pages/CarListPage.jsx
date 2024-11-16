import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../assets/api'; // Assuming api is set up for backend calls

const CarListPage = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch cars from backend
  const fetchCars = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to view cars.');
      return;
    }

    try {
      const response = await api.get('/cars', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request
        },
      });
      setCars(response.data); // Update state with cars data
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch cars');
    }
  };

  // Fetch cars when the component is mounted
  useEffect(() => {
    fetchCars();
  }, []);

  // Handle the search
const handleSearch = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    setError('You must be logged in to search.');
    return;
  }

  try {
    const response = await api.get('/cars', {
      headers: { Authorization: `Bearer ${token}` },
      params: { search: searchTerm }, // Pass search term as query param
    });

    setCars(response.data); // Update cars based on the response from the backend
  } catch (err) {
    setError(err.response?.data?.error || 'Failed to search cars');
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">My Cars</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, description, or tags"
          className="p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div>
        {cars.length === 0 ? (
          <p>No cars found.</p>
        ) : (
          <ul className="space-y-4">
            {cars.map((car) => (
              <li key={car._id} className="bg-white p-4 rounded shadow-md">
                <h3 className="text-xl font-semibold">{car.title}</h3>
                <p>{car.description}</p>
                <p className="text-gray-500">{car.tags}</p>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => navigate(`/cars/${car._id}`)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CarListPage;
