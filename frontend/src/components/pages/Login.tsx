import AuthLayout from '../layouts/AuthLayout';

import { Box, TextField, Button, Link, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import type { UserData } from '../../types/types'
import { hashPassword } from '../../utils/utils'

export default function Login({
  setSession,
  getUser
}: {
  setSession: (session: UserData) => void
  getUser: () => UserData | null
}) {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  const submitLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sign-in logic here
    const storedUser = getUser();

    if (!storedUser) {
      return;
    }
    const hashedPassword = await hashPassword(state.password); // Hash the input password for comparison
    if (storedUser.email !== state.email || storedUser.password !== hashedPassword) {
      alert('Incorrect password. Please try again.');
      return;
    }
    setSession(storedUser);
    navigate('/dashboard');
  }
  return (
    <AuthLayout title="Welcome back." subtitle="Sign in and see how your favorites are doing.">
      <Box component="form" onSubmit={submitLogin}>
        <Stack spacing={2.5}>
          <TextField required name="email" label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
          <TextField required name="password" label="Password" type="password" autoComplete="current-password" value={state.password} onChange={(e) => setState({ ...state, password: e.target.value })} />
          <Button type="submit" variant="contained" fullWidth>Sign in →</Button>
          <Link component="button" type="button" onClick={() => navigate('/singup')} sx={{ textAlign: 'center' }}>New to the club? Create an account</Link>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
