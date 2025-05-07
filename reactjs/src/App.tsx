import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import LoginForm from './components/LoginForm';
import ChatArea from './components/ChatArea';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3011';

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  const login = async () => {
    try {
      const res = await axios.post<{ token: string }>(`${API_URL}/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        alert('Login failed: ' + error.response.data.error);
      } else if (error.request) {
        alert('Network error: Cannot reach the server.');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const askClaude = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post<{ answer: string }>(
        `${API_URL}/ask`,
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponse(res.data.answer);
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        setResponse('Error: ' + error.response.data.error);
      } else if (error.request) {
        setResponse('Network error: Cannot reach the server.');
      } else {
        setResponse('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Claude Chat (AWS Bedrock)
      </Typography>

      {!token ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          login={login}
        />
      ) : (
        <ChatArea
          prompt={prompt}
          setPrompt={setPrompt}
          askClaude={askClaude}
          response={response}
          loading={loading}
          logout={logout}
        />
      )}
    </Container>
  );
}

export default App;
