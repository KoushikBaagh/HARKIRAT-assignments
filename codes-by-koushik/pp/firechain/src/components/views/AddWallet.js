import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const coinTypes = [
  { value: 'Ethereum', label: 'Ethereum' },
  { value: 'Bitcoin', label: 'Bitcoin' },
  // Add more coins as needed
];

function AddWallet() {
  const [address, setAddress] = useState('');
  const [coin, setCoin] = useState(coinTypes[0].value);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would add logic to save the wallet
    setSuccess(true);
    setTimeout(() => navigate('/'), 1200);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add a New Wallet
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Wallet Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          select
          label="Coin Type"
          value={coin}
          onChange={e => setCoin(e.target.value)}
          fullWidth
          margin="normal"
        >
          {coinTypes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Add Wallet
          </Button>
        </Box>
        {success && <Alert severity="success" sx={{ mt: 2 }}>Wallet added! Redirecting...</Alert>}
      </form>
    </Box>
  );
}

export default AddWallet;
