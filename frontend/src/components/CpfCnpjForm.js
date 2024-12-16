import React, { useState } from 'react';

function CpfCnpjForm({ onAdd }) {
  const [type, setType] = useState('CPF');
  const [number, setNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAdd({ type, number });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="CPF">CPF</option>
        <option value="CNPJ">CNPJ</option>
      </select>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Numbers only"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default CpfCnpjForm;
