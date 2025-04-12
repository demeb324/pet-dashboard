import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import PetDetail from './pages/PetDetail';
import { fetchPets } from './services/petfinderAPI';
import './App.css';

export default function App() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const data = await fetchPets();
        setPets(data);
        setFilteredPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPets();
  }, []);

  const handleSearchAndFilter = (searchTerm, filters) => {
    const results = pets.filter(pet => 
      pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.type === 'all' || pet.type?.toLowerCase() === filters.type.toLowerCase()) &&
      (filters.gender === 'all' || pet.gender?.toLowerCase() === filters.gender.toLowerCase())
    );
    setFilteredPets(results);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <Dashboard 
            pets={pets}
            filteredPets={filteredPets}
            handleSearchAndFilter={handleSearchAndFilter}
          />
        } />
        <Route path="/pets/:id" element={<PetDetail />} />
      </Route>
    </Routes>
  );
}