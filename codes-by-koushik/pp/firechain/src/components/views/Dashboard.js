import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Mock wallet data for demonstration
const mockWallets = [
  {
    address: '0x123...abcd',
    type: 'Ethereum',
    balance: '2.5 ETH',
    transactions: 12
  },
  {
    address: 'bc1qxy...xyz',
    type: 'Bitcoin',
    balance: '0.15 BTC',
    transactions: 3
  }
];

function Dashboard() {
  const [wallets] = useState(mockWallets);
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Wallet Dashboard
      </Typography>
      <Grid container spacing={3}>
        {wallets.map((wallet, idx) => (
          <Grid item xs={12} md={6} key={wallet.address}>
            <Card>
              <CardContent>
                <Typography variant="h6">{wallet.type} Wallet</Typography>
                <Typography variant="body2" color="textSecondary">
                  Address: {wallet.address}
                </Typography>
                <Typography variant="body1">Balance: {wallet.balance}</Typography>
                <Typography variant="body2">Transactions: {wallet.transactions}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Button variant="contained" color="primary" component={Link} to="/add">
          Add New Wallet
        </Button>
      </Box>
    </Box>
  );
}

export default Dashboard;
