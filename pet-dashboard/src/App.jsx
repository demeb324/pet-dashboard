import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetCard from './components/PetCard';
import SearchAndFilter from './components/SearchAndFilter';
import StatsPanel from './components/StatsPanel';
import './App.css';

function App() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // PetFinder API credentials
  const API_KEY = 'mUoWMdmCTfnUkxYgqG3QpBsplIgJAfd6s0MWuZZ08egUVIlT6I';
  const API_SECRET = 'B00SPDUTOTFZEoBGrneyPfpMOHOQscB1HIdKxEo5';
  let accessToken = '';
  let tokenExpiration = 0;

  const getAccessToken = async () => {
    if (accessToken && Date.now() < tokenExpiration) return accessToken;

    try {
      const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
        grant_type: 'client_credentials',
        client_id: API_KEY,
        client_secret: API_SECRET
      });

      accessToken = response.data.access_token;
      tokenExpiration = Date.now() + (response.data.expires_in * 1000);
      return accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

  const fetchPets = async () => {
    try {
      const token = await getAccessToken();
      const response = await axios.get('https://api.petfinder.com/v2/animals', {
        params: { limit: 50 },
        headers: { Authorization: `Bearer ${token}` }
      });
      setPets(response.data.animals);
      setFilteredPets(response.data.animals);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => { fetchPets(); }, []);

  const handleSearchAndFilter = (searchTerm, filters) => {
    let results = [...pets];
    
    if (searchTerm) {
      results = results.filter(pet => 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pet.description && pet.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (filters.type !== 'all') {
      results = results.filter(pet => pet.type.toLowerCase() === filters.type.toLowerCase());
    }
    
    if (filters.gender !== 'all') {
      results = results.filter(pet => pet.gender.toLowerCase() === filters.gender.toLowerCase());
    }
    
    setFilteredPets(results);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-container">
      <h1 className="app-title">PetFinder Dashboard</h1>
      
      <StatsPanel pets={filteredPets} />
      
      <SearchAndFilter onSearchAndFilter={handleSearchAndFilter} />
      
      <div className="pets-grid">
        {filteredPets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
      
      {filteredPets.length === 0 && (
        <div className="no-results">No pets found matching your criteria.</div>
      )}
    </div>
  );
}

export default App;