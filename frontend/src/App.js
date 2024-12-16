// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import CpfCnpjForm from './components/CpfCnpjForm';
import CpfCnpjList from './components/CpfCnpjList';
import Filters from './components/Filters';
import ErrorMessage from './components/ErrorMessage';
import api from './services/api';

function App() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState([]);
  const [filter, setFilter] = useState({ type: '', isBlocked: '' });

  const fetchItems = useCallback(async () => {
    const query = new URLSearchParams(filter).toString();
    const { data } = await api.get(`/cpfs-cnpjs?${query}`);
    setItems(data);
  }, [filter]);

  const handleAddItem = async (item) => {
    try {
      const { data } = await api.post('/cpfs-cnpjs', item);
      setItems([...items, data]);
      setMessage('');
    } catch (error) {
      setMessage(error?.response?.data?.error || "Unknown error");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await api.delete(`/cpfs-cnpjs/${id}`);
      fetchItems();
      setMessage('');
    } catch (error) {
      setMessage(error?.response?.data?.error || "Unknown error");
    }

  };

  const handleToggleBlock = async (id, isBlocked) => {
    try {
      const { data } = await api.patch(`/cpfs-cnpjs/${id}/block`, { isBlocked });
      setItems(items.map((item) => (item._id === id ? data : item)));
      setMessage('');
    } catch (error) {
      setMessage(error?.response?.data?.error || "Unknown error");
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };


  useEffect(() => {
    fetchItems();
  }, [filter, fetchItems]);

  return (
    <div className="App">
      <h1>CPF/CNPJ Manager</h1>
      <CpfCnpjForm onAdd={handleAddItem} />
      {message && <ErrorMessage message={message} />}
      <Filters onChange={handleFilterChange} />
      <CpfCnpjList items={items} onBlockToggle={handleToggleBlock} onDelete={handleDeleteItem} />
    </div>
  );
}

export default App;
