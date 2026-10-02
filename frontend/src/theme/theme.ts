import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#12665E', dark: '#0D403C' },
    secondary: { main: '#F1A78B' },
    background: { default: '#F7F8F4', paper: '#FFFFFF' },
    text: { primary: '#173D38', secondary: '#667873' },
    success: { main: '#238575' },
    error: { main: '#BB5148' },
  },
  typography: {
    fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif',
    h1: { fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.05em' },
    h4: { fontWeight: 800, letterSpacing: '-0.035em' },
    h5: { fontWeight: 700, letterSpacing: '-0.025em' },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 12, padding: '12px 22px' } },
    },
    MuiTextField: { defaultProps: { fullWidth: true } },
    MuiOutlinedInput: { styleOverrides: { root: { backgroundColor: '#FAFBF8', borderRadius: 12 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiCssBaseline: { styleOverrides: { body: { margin: 0 }, a: { textUnderlineOffset: '4px' } } },
  },
});
