import React, { useState } from 'react';

const SearchAndFilter = ({ onSearchAndFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    gender: 'all'
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchAndFilter(value, filters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onSearchAndFilter(searchTerm, newFilters);
  };

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search pets by name or description"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="filter-controls">
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
          <option value="bird">Bird</option>
        </select>
        
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="all">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;