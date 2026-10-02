import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export default function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
      <Stack component="aside" sx={{ bgcolor: 'primary.dark', color: '#FFF9E9', p: { xs: 4, md: 7 }, justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        <Typography variant="h6">🐌 Snail Race <Box component="span" sx={{ color: '#F1A78B' }}>Club</Box></Typography>
        <Box sx={{ py: { xs: 5, md: 8 }, maxWidth: 470 }}>
          <Typography sx={{ color: '#B9D8C2', textTransform: 'uppercase', letterSpacing: 3, fontSize: 12, mb: 3 }}>Small racers. Big excitement.</Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.6rem', lg: '4.4rem' }, lineHeight: 1.06 }}>Life in the<br />slow lane.</Typography>
          <Typography sx={{ color: '#C4D8CF', mt: 3, maxWidth: 320, lineHeight: 1.8 }}>Pick your favorite. Follow the race. Enjoy every little victory.</Typography>
          <Box aria-hidden="true" sx={{ mt: 5, fontSize: { xs: 70, md: 110 }, borderBottom: '2px dashed #89B4A2', pb: 1 }}>🐌 <Box component="span" sx={{ fontSize: '0.55em' }}>🪨</Box></Box>
        </Box>
        <Typography variant="caption" sx={{ color: '#B9D8C2' }}>A little friendly competition, at your own pace.</Typography>
      </Stack>
      <Stack component="main" sx={{ p: { xs: 3, sm: 6 }, justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 420 }}>
          <Typography variant="overline" color="primary" sx={{ letterSpacing: 2 }}>Welcome to the club</Typography>
          <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>{title}</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>{subtitle}</Typography>
          {children}
        </Box>
      </Stack>
    </Box>
  );
}
