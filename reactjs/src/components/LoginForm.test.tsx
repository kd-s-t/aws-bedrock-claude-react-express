import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

test('renders LoginForm and accepts input', () => {
  const setUsername = jest.fn();
  const setPassword = jest.fn();
  const login = jest.fn();

  render(
    <LoginForm
      username=""
      password=""
      setUsername={setUsername}
      setPassword={setPassword}
      login={login}
    />
  );

  // Check Username field exists
  const usernameField = screen.getByLabelText(/Username/i);
  expect(usernameField).toBeInTheDocument();

  // Simulate typing into Username
  fireEvent.change(usernameField, { target: { value: 'admin' } });
  expect(setUsername).toHaveBeenCalledWith('admin');

  // Check Password field exists
  const passwordField = screen.getByLabelText(/Password/i);
  expect(passwordField).toBeInTheDocument();

  // Simulate clicking Login button
  const button = screen.getByRole('button', { name: /Login/i });
  fireEvent.click(button);
  expect(login).toHaveBeenCalled();
});
