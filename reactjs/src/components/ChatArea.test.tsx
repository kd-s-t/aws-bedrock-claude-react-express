import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatArea from './ChatArea';

test('renders ChatArea and sends a message', () => {
  const setPrompt = jest.fn();
  const askClaude = jest.fn();
  const logout = jest.fn();

  render(
    <ChatArea
      prompt=""
      setPrompt={setPrompt}
      askClaude={askClaude}
      response=""
      loading={false}
      logout={logout}
    />
  );

  // Check Logout button exists
  const logoutButton = screen.getByRole('button', { name: /Logout/i });
  expect(logoutButton).toBeInTheDocument();
  fireEvent.click(logoutButton);
  expect(logout).toHaveBeenCalled();

  // Check input field
  const promptField = screen.getByLabelText(/Ask Claude/i);
  fireEvent.change(promptField, { target: { value: 'Hello Claude' } });
  expect(setPrompt).toHaveBeenCalledWith('Hello Claude');

  // Click Send button
  const sendButton = screen.getByRole('button', { name: /Send/i });
  fireEvent.click(sendButton);
  expect(askClaude).toHaveBeenCalled();
});
