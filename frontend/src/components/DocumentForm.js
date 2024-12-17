import React, { useState } from 'react';

function DocumentForm({ onAdd }) {
  const [type, setType] = useState('CPF');
  const [number, setNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAdd({ type, number });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center">
      <select 
        value={type} 
        onChange={(e) => setType(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="CPF">CPF</option>
        <option value="CNPJ">CNPJ</option>
      </select>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Numbers only"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add
      </button>
    </form>
  );
}

export default DocumentForm;
