import React from 'react';
import { IconButton, Tooltip, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const handleToggle = () => {
    toggleTheme();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} placement="top" arrow>
      <IconButton
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        size={isMobile ? 'medium' : 'large'}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          backgroundColor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: 'action.hover',
            transform: 'scale(1.05)',
          },
          '&:focus': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
          '@media (prefers-reduced-motion: reduce)': {
            '&:hover': {
              transform: 'none',
            },
          },
        }}
      >
        {mode === 'light' ? <Moon size={isMobile ? 20 : 24} /> : <Sun size={isMobile ? 20 : 24} />}
      </IconButton>
    </Tooltip>
  );
};
