import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders main components', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});