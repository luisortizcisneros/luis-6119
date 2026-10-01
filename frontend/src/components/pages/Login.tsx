
import { Box, TextField, Button, Link, Grid } from '@mui/material'
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
    console.log('User Item:', storedUser)
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
    <Grid
      container
      spacing={0}>
      <Grid
        size={6}>
        <Box
          component="section"
          sx={{
            color: "text.secondary",
            bgcolor: "secondary.main",
          }}
        >
          <h1>Snail Race</h1>
        </Box>
      </Grid>
      <Grid
        size={6}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={submitLogin}
        >
          <TextField
            id="outlined-required"
            label="Email"
            type="email"
            placeholder="example@domain.com"
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          <Button
            type="submit"
            name="submit"
          >
            Sign In
          </Button>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/singup')}
          >
            Don't have an account? Sing up here.
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}