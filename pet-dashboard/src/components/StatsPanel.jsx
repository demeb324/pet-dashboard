import React from 'react';

const StatsPanel = ({ pets }) => {
  const totalPets = pets.length;
  const dogs = pets.filter(pet => pet.type === 'Dog').length;
  const cats = pets.filter(pet => pet.type === 'Cat').length;
  const males = pets.filter(pet => pet.gender === 'Male').length;
  const females = pets.filter(pet => pet.gender === 'Female').length;
  
  const ageStats = pets.reduce((acc, pet) => {
    if (pet.age === 'Baby') return { ...acc, baby: acc.baby + 1 };
    if (pet.age === 'Young') return { ...acc, young: acc.young + 1 };
    if (pet.age === 'Adult') return { ...acc, adult: acc.adult + 1 };
    if (pet.age === 'Senior') return { ...acc, senior: acc.senior + 1 };
    return acc;
  }, { baby: 0, young: 0, adult: 0, senior: 0 });
  
  const mostCommonAge = Object.entries(ageStats).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <div className="stats-panel">
      <h3 className="stats-title">Statistics</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span role="img" aria-label="pets">🐾</span> Total Pets: {totalPets}
        </div>
        <div className="stat-item">
          <span role="img" aria-label="dog">🐕</span> Dogs: {dogs} | <span role="img" aria-label="cat">🐈</span> Cats: {cats}
        </div>
        <div className="stat-item">
          <span role="img" aria-label="male">♂</span> Males: {males} | <span role="img" aria-label="female">♀</span> Females: {females}
        </div>
        <div className="stat-item">
          <span role="img" aria-label="home">🏠</span> Most Common Age: {mostCommonAge}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;