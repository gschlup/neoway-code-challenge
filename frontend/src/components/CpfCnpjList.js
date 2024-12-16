import React from 'react';

function CpfCnpjList({ items, onBlockToggle, onDelete }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          {item.number} ({item.type}) - Blocked: {item.isBlocked ? 'Yes' : 'No'}
          <button onClick={() => onBlockToggle(item._id, !item.isBlocked)}>
            {item.isBlocked ? 'Unblock' : 'Block'}
          </button>
          <button onClick={() => onDelete(item._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CpfCnpjList;
