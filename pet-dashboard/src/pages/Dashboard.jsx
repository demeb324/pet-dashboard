import { useState } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard';
import SearchFilter from '../components/SearchAndFilter';
import StatsPanel from '../components/StatsPanel';

export default function Dashboard({ pets, filteredPets, handleSearchAndFilter }) {
  return (
    <>
      <SearchFilter onSearch={handleSearchAndFilter} />
      <StatsPanel pets={filteredPets} />
      <div className="pets-grid">
        {filteredPets.map(pet => (
          <Link to={`/pets/${pet.id}`} key={pet.id}>
            <PetCard pet={pet} />
          </Link>
        ))}
      </div>
    </>
  );
}