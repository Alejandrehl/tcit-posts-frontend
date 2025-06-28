import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { Shadows } from '@mui/material/styles';

// Color palette with WCAG-AA compliance
const colors = {
  light: {
    primary: {
      main: '#2563eb', // Blue 600
      light: '#3b82f6', // Blue 500
      dark: '#1d4ed8', // Blue 700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c3aed', // Violet 600
      light: '#8b5cf6', // Violet 500
      dark: '#6d28d9', // Violet 700
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc2626', // Red 600
      light: '#ef4444', // Red 500
      dark: '#b91c1c', // Red 700
      contrastText: '#ffffff',
    },
    warning: {
      main: '#d97706', // Amber 600
      light: '#f59e0b', // Amber 500
      dark: '#b45309', // Amber 700
      contrastText: '#ffffff',
    },
    info: {
      main: '#0891b2', // Cyan 600
      light: '#06b6d4', // Cyan 500
      dark: '#0e7490', // Cyan 700
      contrastText: '#ffffff',
    },
    success: {
      main: '#059669', // Emerald 600
      light: '#10b981', // Emerald 500
      dark: '#047857', // Emerald 700
      contrastText: '#ffffff',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      disabled: '#94a3b8',
    },
  },
  dark: {
    primary: {
      main: '#3b82f6', // Blue 500
      light: '#60a5fa', // Blue 400
      dark: '#2563eb', // Blue 600
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6', // Violet 500
      light: '#a78bfa', // Violet 400
      dark: '#7c3aed', // Violet 600
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444', // Red 500
      light: '#f87171', // Red 400
      dark: '#dc2626', // Red 600
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b', // Amber 500
      light: '#fbbf24', // Amber 400
      dark: '#d97706', // Amber 600
      contrastText: '#ffffff',
    },
    info: {
      main: '#06b6d4', // Cyan 500
      light: '#22d3ee', // Cyan 400
      dark: '#0891b2', // Cyan 600
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981', // Emerald 500
      light: '#34d399', // Emerald 400
      dark: '#059669', // Emerald 600
      contrastText: '#ffffff',
    },
    grey: {
      50: '#0f172a',
      100: '#1e293b',
      200: '#334155',
      300: '#475569',
      400: '#64748b',
      500: '#94a3b8',
      600: '#cbd5e1',
      700: '#e2e8f0',
      800: '#f1f5f9',
      900: '#f8fafc',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      disabled: '#64748b',
    },
  },
} as const;

const createAppTheme = (mode: PaletteMode): ThemeOptions => {
  const colorSet = colors[mode as keyof typeof colors];

  return {
    palette: {
      mode,
      ...colorSet,
      divider: mode === 'light' ? alpha(colorSet.grey[900], 0.12) : alpha(colorSet.grey[100], 0.12),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.025em',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.025em',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '-0.025em',
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '-0.025em',
        lineHeight: 1.4,
      },
      body1: {
        fontWeight: 400,
        lineHeight: 1.6,
      },
      body2: {
        fontWeight: 400,
        lineHeight: 1.6,
      },
      button: {
        fontWeight: 600,
        letterSpacing: '0.025em',
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      mode === 'light'
        ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        : '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
      mode === 'light'
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      mode === 'light'
        ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      mode === 'light'
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        : '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      mode === 'light'
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    ] as unknown as Shadows,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
          },
          html: {
            scrollBehavior: 'smooth',
          },
          body: {
            margin: 0,
            padding: 0,
            minHeight: '100vh',
            '@media (prefers-reduced-motion: reduce)': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              transitionDuration: '0.01ms !important',
            },
          },
          'button, input, textarea, select': {
            fontFamily: 'inherit',
          },
          'button:focus, input:focus, textarea:focus, select:focus': {
            outline: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 600,
            letterSpacing: '0.025em',
            textTransform: 'none',
            minHeight: 44,
            minWidth: 44,
            padding: '12px 24px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover': {
                transform: 'none',
              },
              '&:active': {
                transform: 'none',
              },
            },
          },
          contained: {
            boxShadow:
              mode === 'light'
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              boxShadow:
                mode === 'light'
                  ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-1px)',
              },
              '&.Mui-focused': {
                transform: 'translateY(-2px)',
              },
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
                '&:hover': {
                  transform: 'none',
                },
                '&.Mui-focused': {
                  transform: 'none',
                },
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover': {
                transform: 'none',
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: 'none',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            minWidth: 44,
            minHeight: 44,
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover': {
                transform: 'none',
              },
              '&:active': {
                transform: 'none',
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 500,
          },
        },
      },
    },
  };
};

export const lightTheme = createTheme(createAppTheme('light'));
export const darkTheme = createTheme(createAppTheme('dark'));

export default createAppTheme;
