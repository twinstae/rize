import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/아이즈원 메일/i);
  expect(linkElement).toBeInTheDocument();
});
