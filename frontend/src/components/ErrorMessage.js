import React from 'react';

function ErrorMessage({ message }) {

  console.log({message});

  if (!message) return null;

  return (
    <div>{message}</div>
  );
}

export default ErrorMessage;
