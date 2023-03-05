import React, { useState } from 'react';
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const hasSmallWidth = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const printMenuItems = (): React.ReactNode => {
    const menuItems = [
      <MenuItem onClick={handleMenuClose} component={Link} to="/">
        Home
      </MenuItem>,
      <MenuItem onClick={handleMenuClose} component={Link} to="/tags">
        Tags
      </MenuItem>,
    ];

    return React.Children.map(menuItems, (menuItem) => menuItem);
  };

  return (
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

        {!hasSmallWidth && printMenuItems()}

        {hasSmallWidth && (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="navbar-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {printMenuItems()}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
