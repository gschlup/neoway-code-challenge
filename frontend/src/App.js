// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import DocumentForm from './components/DocumentForm';
import DocumentList from './components/DocumentList';
import Filters from './components/Filters';
import ErrorMessage from './components/ErrorMessage';
import api from './services/api';

function App() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState({ type: '', isBlocked: '' });

  const fetchItems = useCallback(async () => {
    const query = new URLSearchParams(filter).toString();
    const { data } = await api.get(`/document?${query}`);
    setItems(data);
  }, [filter]);

  const handleAddItem = async (item) => {
    try {
      const { data } = await api.post('/document', item);
      setItems([...items, data]);
      setMessage('');
    } catch (error) {
      setMessage(`Failed to add document: ${error?.response?.data?.error || "Unknown error"}`);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await api.delete(`/document/${id}`);
      fetchItems();
      setMessage('');
    } catch (error) {
      setMessage(`Failed to delete document: ${error?.response?.data?.error || "Unknown error"}`);
    }

  };

  const handleToggleBlock = async (id, isBlocked) => {
    try {
      const { data } = await api.patch(`/document/${id}/block`, { isBlocked });
      setItems(items.map((item) => (item._id === id ? data : item)));
      setMessage('');
    } catch (error) {
      setMessage(`Failed to block document: ${error?.response?.data?.error || "Unknown error"}`);
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
      <DocumentForm onAdd={handleAddItem} />
      {message && <ErrorMessage message={message} />}
      <Filters onChange={handleFilterChange} />
      <DocumentList items={items} onBlockToggle={handleToggleBlock} onDelete={handleDeleteItem} />
    </div>
  );
}

export default App;
