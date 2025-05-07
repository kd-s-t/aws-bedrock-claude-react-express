import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Claude Chat title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Claude Chat/i);
  expect(titleElement).toBeInTheDocument();
});
