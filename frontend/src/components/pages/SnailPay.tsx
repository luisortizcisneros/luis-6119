import { TextField, Button, Box, Stack, Typography, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function SnailPay() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, sm: 7 } }}>
      <Button onClick={() => navigate('/dashboard')} sx={{ mb: 3 }}>← Back to dashboard</Button>
      <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: '1px solid #E1E8E0' }}>
        <Typography variant="overline" color="primary">Snail Pay</Typography>
        <Typography variant="h4" sx={{ mb: 1 }}>Add a little fuel.</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>Payment form preview. Payments are not connected yet.</Typography>
        <Box><Stack spacing={2.5}>
          <TextField label="Cardholder name" name="cardholderName" autoComplete="cc-name" />
          <TextField label="Card number" name="cardNumber" autoComplete="cc-number" />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label="Expiration (MM/YY)" name="expirationDate" autoComplete="cc-exp" />
            <TextField label="CVV" name="cvv" type="password" autoComplete="cc-csc" />
          </Stack>
          <TextField label="Amount ($)" name="amount" type="number" />
          <Button variant="contained" disabled>Payment coming soon</Button>
        </Stack></Box>
      </Paper>
    </Container>
  );
}
