import React from 'react';
import { TextField, Button, Paper, Typography, CircularProgress } from '@mui/material';

interface Props {
  prompt: string;
  setPrompt: (value: string) => void;
  askClaude: () => void;
  response: string;
  loading: boolean;
  logout: () => void;
}

function ChatArea({ prompt, setPrompt, askClaude, response, loading, logout }: Props) {
  return (
    <>
      <Button variant="outlined" color="secondary" onClick={logout}>
        Logout
      </Button>

      <TextField
        label="Ask Claude something..."
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        sx={{ mt: 4, mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={askClaude}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
      </Button>

      <Paper
        elevation={3}
        sx={{ mt: 4, p: 2, minHeight: 100 }}
      >
        <Typography variant="h6">Response:</Typography>
        <Typography variant="body1">
          {response || (loading ? 'Thinking...' : 'No response yet.')}
        </Typography>
      </Paper>
    </>
  );
}

export default ChatArea;
