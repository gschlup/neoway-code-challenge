import React from 'react';

function ErrorMessage({ message }) {

  console.log({message});

  if (!message) return null;

  return (
    <div className="flex justify-center items-center w-full">
      <span className="p-4 mt-4 mb-4 text-red-700 bg-red-100 rounded-lg w-1/2 text-center align-middle font-bold">{message}</span>
    </div>
  );
}

export default ErrorMessage;
