import React from 'react';

function ErrorMessage({ message }) {

  console.log({message});

  if (!message) return null;

  return (
    <div className="p-4 mt-4 mb-4 text-red-700 bg-red-100 rounded-lg h-6">{message}</div>
  );
}

export default ErrorMessage;
