import { BarChart } from '@mui/x-charts/BarChart';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Container, Paper, Stack, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import type { UserData } from '../../types/types';
import { useState } from 'react';

export default function Dashboard({
  session,
  clearSession
}: {
  session: UserData,
  clearSession: () => void
}) {

  const navigate = useNavigate();

  // Function to get a seed based on the current date. 
  // This ensures that the random numbers generated are consistent for a given day.
  function getDaySeed() {
    const today = new Date();

    return (
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate()
    );
  }

  // An old method to generate pseudo-random numbers based on a seed. 
  // This is used to ensure that the bets are consistent for a given day.
  function seededRandom(seed: number) {
    let value = seed;

    return () => {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  }

  function generateBetsState() {
    const snailBets = {
      gary: 0,
      rocky: 0,
      snally: 0,
      turbo: 0,
      dash: 0,
      rocket: 0
    } as Record<string, number>;
    const BET_AMOUNT = 6; // Total amount to be distributed among the snails
    const snailNames = Object.keys(snailBets);
    const random = seededRandom(getDaySeed());
    for (let i = 0; i < BET_AMOUNT; i++) {
      const randomIndex = Math.floor(
        random() * snailNames.length
      );

      const randomSnail = snailNames[randomIndex];

      snailBets[randomSnail]++;
    }

    return snailBets;
  }

  const [betsState] = useState(() => generateBetsState());
  const snailNames = Object.keys(betsState).map(name => name.charAt(0).toUpperCase() + name.slice(1));
  return (
    <Box sx={{ minHeight: '100dvh' }}>
      <Box component="header" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid #E1E8E0' }}>
        <Container maxWidth="lg">
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", py: 2.5, gap: 2 }}>
            <Typography variant="h6">🐌 Snail Race <Box component="span" sx={{ color: 'primary.main' }}>Club</Box></Typography>
            <Button variant="outlined" onClick={clearSession} size="small">Sign out</Button>
          </Stack>
        </Container>
      </Box>
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, mb: 4 }}>
          <Box>
            <Typography variant="overline" color="primary" sx={{ letterSpacing: 2 }}>Your race headquarters</Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>Welcome, {session.name}!</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>A good day to take it slow.</Typography>
          </Box>
          <Chip label="Daily race overview" variant="outlined" sx={{ bgcolor: '#EDF3E8', borderColor: '#D8E2D1' }} />
        </Stack>
        <Paper elevation={0} sx={{ bgcolor: 'primary.dark', color: '#FFF9E9', p: { xs: 3, md: 4 }, mb: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}>
            <Box><Typography sx={{ color: '#B9D8C2', mb: 1 }}>Available balance</Typography><Typography variant="h4">${session.balance.toFixed(2)}</Typography></Box>
            <Button variant="contained" color="secondary" onClick={() => navigate('/pay')}>+ Add funds</Button>
          </Stack>
        </Paper>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' }, gap: 3 }}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #E1E8E0', minWidth: 0 }}>
            <Typography variant="h6">Bets by racer</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Today's simulated distribution</Typography>
            <PieChart series={[{ data: Object.entries(betsState).map(([name, value]) => ({ id: name, label: name.charAt(0).toUpperCase() + name.slice(1), value })), innerRadius: 65, outerRadius: 100, paddingAngle: 3, cornerRadius: 5 }]} colors={['#12665E', '#E49B7E', '#91B7A0', '#D6BD6B', '#8297B7', '#C69EBD']} height={300} />
            <Typography variant="caption" color="text.secondary">Sample data stays consistent when you refresh today.</Typography>
          </Paper>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #E1E8E0', minWidth: 0 }}>
            <Typography variant="h6">Meet the competition</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Six racers. One very slow finish line.</Typography>
            <BarChart xAxis={[{ scaleType: 'band', data: snailNames }]} yAxis={[{ min: 0, tickMinStep: 1 }]} series={[{ data: Object.values(betsState), label: 'Bets', color: '#12665E' }]} height={300} borderRadius={7} hideLegend />
          </Paper>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3 }}>Local demo · All race data is simulated.</Typography>
      </Container>
    </Box>
  );
}
