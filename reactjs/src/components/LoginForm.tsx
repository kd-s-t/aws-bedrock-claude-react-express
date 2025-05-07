import React from 'react';
import { TextField, Button } from '@mui/material';

interface Props {
  username: string;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  login: () => void;
}

function LoginForm({ username, password, setUsername, setPassword, login }: Props) {
  return (
    <>
      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={login}>
        Login
      </Button>
    </>
  );
}

export default LoginForm;
