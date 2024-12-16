import React from 'react';

function ErrorMessage({ message }) {

  console.log({message});

  if (!message) return null;

  return (
    <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{message}</div>
  );
}

export default ErrorMessage;
