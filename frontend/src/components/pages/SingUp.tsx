import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { hashPassword } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import type { UserSession, UserData } from '../../types/types';

export default function SingUp({
  setSession,
  setUserData
}: {
  setSession: (session: UserSession) => void,
  setUserData: (user: UserData) => void
}) {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const submitSingUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('Sign-up data:', state)
    // Validate form data
    if (state.password !== state.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    const user: UserData = {
      name: state.name,
      lastName: state.lastName,
      email: state.email,
      password: await hashPassword(state.password),
      balance: 0 // Initialize balance to 0
    };
    setUserData(user);
    setSession(user);
    navigate('/dashboard');
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <h1>Create your account</h1>
      <Box
        component="form"
        onSubmit={submitSingUp}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="name"
          id="outlined-name-input"
          label="Name"
          type="text"
          placeholder="John"
          onChange={handleInputChange}
        />
        <TextField
          name="lastName"
          id="outlined-last-name-input"
          label="Last Name"
          type="text"
          placeholder="Smith"
          onChange={handleInputChange}
        />
        <TextField
          name="email"
          id="outlined-required"
          label="Email"
          type="email"
          placeholder="example@domain.com"
          onChange={handleInputChange}
        />
        <TextField
          name="password"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleInputChange}
        />
        <TextField
          name="confirmPassword"
          id="outlined-password-confirm-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          name="submit"
        >
          Sign Up
        </Button>
      </Box>
    </>
  )
}