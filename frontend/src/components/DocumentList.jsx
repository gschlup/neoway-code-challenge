import React from 'react';

function DocumentList({ items, onBlockToggle, onDelete }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <span className="text-gray-800">{item.type}</span>
          <span className="text-gray-800">{item.number}</span>
          <span className={`ml-2 ${item.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
            Blocked: {item.isBlocked ? 'Yes' : 'No'}
          </span>
          <div className="space-x-2">
            <button 
              onClick={() => onBlockToggle(item._id, !item.isBlocked)}
              className={`px-4 py-2 rounded-md text-white w-24 ${
                item.isBlocked 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {item.isBlocked ? 'Unblock' : 'Block'}
            </button>
            <button 
              onClick={() => onDelete(item._id)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-24"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DocumentList;
