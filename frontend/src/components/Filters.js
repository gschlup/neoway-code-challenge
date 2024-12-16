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
    <div className="filters">
      <label htmlFor="type">Type:</label>
      <select id="type" value={type} onChange={handleTypeChange}>
        <option value="">All</option>
        <option value="CPF">CPF</option>
        <option value="CNPJ">CNPJ</option>
      </select>

      <label htmlFor="isBlocked">Status:</label>
      <select id="isBlocked" value={isBlocked} onChange={handleBlockedChange}>
        <option value="">All</option>
        <option value="true">Blocked</option>
        <option value="false">Unblocked</option>
      </select>
    </div>
  );
}

export default Filters;