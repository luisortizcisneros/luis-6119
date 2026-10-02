import AuthLayout from '../layouts/AuthLayout';
import React from 'react';
import { Box, TextField, Button, Stack, Link } from '@mui/material';
import { hashPassword } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import type { UserData } from '../../types/types';

export default function SingUp({
  setSession,
  setUserData
}: {
  setSession: (session: UserData) => void,
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
  const [errors, setErrors] = React.useState<FieldErrors>({});
  type FieldErrors = Partial<Record<keyof typeof state, string>>;

  const submitSingUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sign-up logic here
    const nextErrors = validateForm();
    setErrors(nextErrors);

    // Validate form data
    if (state.password.trim() !== state.confirmPassword.trim()) {
      return;
    }
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    const user: UserData = {
      name: state.name.trim(),
      lastName: state.lastName.trim(),
      email: state.email.trim(),
      password: await hashPassword(state.password.trim()),
      balance: 0 // Initialize balance to 0
    };
    setUserData(user);
    setSession(user);
    navigate('/dashboard');
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    event.target.classList.remove('error'); // Reset error state for the input field
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function validateForm(): FieldErrors {
    const nextErrors: FieldErrors = {};
    console.log('Validating form with state:', state);
    console.log(state.name.trim(), state.lastName.trim(), state.password, state.confirmPassword);
    if (!state.name.trim()) {
      nextErrors.name = "Enter your first name.";
    }

    if (!state.lastName.trim()) {
      nextErrors.lastName = "Enter your last name.";
    }

    if (state.password && state.password !== state.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  }

  return (
    <AuthLayout title="Join the slow lane." subtitle="Create your account and meet your new favorites.">
      <Box component="form" onSubmit={submitSingUp}>
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              name="name"
              label="First name"
              autoComplete="given-name"
              value={state.name}
              onChange={handleInputChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              required
              name="lastName"
              label="Last name"
              autoComplete="family-name"
              value={state.lastName}
              onChange={handleInputChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Stack>
          <TextField
            required name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            value={state.email}
            onChange={handleInputChange}
          />
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={state.password}
            onChange={handleInputChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <TextField
            required
            name="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={state.confirmPassword}
            onChange={handleInputChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
          <Button type="submit" variant="contained">Create account →</Button>
          <Link component="button" type="button" onClick={() => navigate('/')} sx={{ textAlign: 'center' }}>Already a member? Sign in</Link>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
