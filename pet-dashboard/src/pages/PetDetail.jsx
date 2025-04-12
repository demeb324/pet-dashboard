import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPetDetails } from '../services/petfinderAPI';

export default function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const data = await fetchPetDetails(id);
        setPet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPet();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pet) return <div>Pet not found</div>;

  return (
    <div className="pet-detail">
      <h2>{pet.name}</h2>
      <p>Type: {pet.type}</p>
      <p>Breed: {pet.breeds?.primary}</p>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
}