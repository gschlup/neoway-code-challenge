// src/components/Filters.js
import React, { useState } from 'react';
import './Filters.css';

function Filters({ onChange }) {
  const [type, setType] = useState('');
  const [isBlocked, setIsBlocked] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
    onChange({ type: e.target.value });
  };

  const handleBlockedChange = (e) => {
    setIsBlocked(e.target.value);
    onChange({ isBlocked: e.target.value });
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow mb-4">
      <div className="flex items-center gap-2">
        <label htmlFor="type" className="text-gray-700 font-medium">Type:</label>
        <select 
          id="type" 
          value={type} 
          onChange={handleTypeChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="CPF">CPF</option>
          <option value="CNPJ">CNPJ</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="isBlocked" className="text-gray-700 font-medium">Status:</label>
        <select 
          id="isBlocked" 
          value={isBlocked} 
          onChange={handleBlockedChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="true">Blocked</option>
          <option value="false">Unblocked</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;