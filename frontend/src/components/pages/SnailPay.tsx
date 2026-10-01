import { TextField, Button, Box } from '@mui/material';
export default function SnailPay() {
  return (
    <Box>
      <TextField
        label="Cardholder Name"
        name="cardholderName"
      />
      <TextField
        label="Card Number"
        name="cardNumber"
      />
      <TextField
        label="Expiration Date"
        name="expirationDate"
        type="date"
      />
      <TextField
        label="cvv"
        name="cvv"
        type="number"
      />
      <TextField
        label="Amount"
        name="amount"
        type="number"
      />
      <Button>Pay</Button>
    </Box>
  );
}