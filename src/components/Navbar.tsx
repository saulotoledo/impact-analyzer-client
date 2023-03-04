import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar: React.FC = () => (
  <AppBar>
    <Toolbar
      sx={{
        '& a': {
          fontWeight: 700,
        },
      }}
    >
      <Typography
        sx={{
          flexGrow: 1,
          fontSize: '1.5rem',
          textAlign: 'left',
        }}
      >
        Impact Analyzer
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
