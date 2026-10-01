import { Box, Button, Link } from '@mui/material';
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
    console.log('Initial Bets State:', snailBets);
    return snailBets;
  }

  const [betsState] = useState(() => generateBetsState());
  const chartData = Object.entries(betsState).map(([snail, value]: [string, number]) => ({
    label: snail,
    value: value
  }));
  return (<>
    <Box>
      <h1>Welcome, {session.name}!</h1>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Balance: ${session.balance.toFixed(2)}</h2>
        <Button>Add Funds</Button>
      </Box>
      <PieChart
        series={[
          {
            data: chartData,
            innerRadius: 70,
            outerRadius: 120,
            paddingAngle: 3,
            cornerRadius: 4,
          },
        ]}
        width={400}
        height={300}
      />
      <Link onClick={clearSession}>Sign Out</Link>
    </Box>
  </>)
}