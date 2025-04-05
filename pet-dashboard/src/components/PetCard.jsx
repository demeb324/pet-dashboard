import React from 'react';

const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      {pet.photos[0]?.medium && (
        <img 
          src={pet.photos[0].medium} 
          alt={pet.name}
          className="pet-image"
        />
      )}
      <div className="pet-info">
        <h3 className="pet-name">
          {pet.name}
          <span className={`gender-icon ${pet.gender.toLowerCase()}`}>
            {pet.gender === 'Female' ? '♀' : '♂'}
          </span>
        </h3>
        
        <div className="pet-tags">
          <span className="pet-tag">
            <span role="img" aria-label="pet">🐾</span> {pet.type}
          </span>
          <span className="pet-tag">
            <span role="img" aria-label="age">🎂</span> {pet.age}
          </span>
          <span className="pet-tag">{pet.breeds.primary}</span>
        </div>
        
        <p className="pet-description">
          {pet.description || 'No description available.'}
        </p>
        
        {pet.contact?.email && (
          <p className="pet-contact">
            Contact: {pet.contact.email}
          </p>
        )}
      </div>
    </div>
  );
};

export default PetCard;