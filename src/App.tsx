import React, { useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Alert,
  Paper,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { PostForm } from '@components/PostForm';
import { PostFilter } from '@components/PostFilter';
import { PostList } from '@components/PostList';
import { ThemeToggle } from '@components/ThemeToggle';
import { usePosts } from '@hooks/usePosts';

const App: React.FC = () => {
  const { items, loading, error } = usePosts();
  const [filter, setFilter] = useState('');
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('lg'));

  const renderContent = () => {
    if (loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
          sx={{
            animation: 'fadeIn 0.3s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none',
            },
          }}
        >
          <CircularProgress size={60} color="primary" />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert
          severity="error"
          sx={{
            mt: 3,
            mb: 3,
            borderRadius: 3,
            animation: 'fadeIn 0.3s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(-10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none',
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Backend Connection Error
          </Typography>
          <Typography variant="body1" paragraph>
            Could not connect to the backend server.
          </Typography>
          <Typography variant="body2" component="div">
            <strong>Possible solutions:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Make sure the backend is running on port 3000</li>
              <li>Check your .env file and the VITE_API_BASE_URL variable</li>
              <li>Ensure there are no network or firewall issues</li>
              <li>Check the backend server logs</li>
            </ul>
          </Typography>
        </Alert>
      );
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 3 : isTablet ? 4 : 5,
          width: '100%',
          maxWidth: isDesktop ? '1400px' : '100%',
          mx: 'auto',
          animation: 'fadeIn 0.3s ease-in-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: isMobile ? 3 : isTablet ? 4 : 5,
            borderRadius: 3,
            animation: 'slideInUp 0.3s ease-out 0.1s both',
            '@keyframes slideInUp': {
              '0%': { opacity: 0, transform: 'translateY(30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none',
            },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: 'primary.main',
              mb: isMobile ? 2 : 3,
              fontWeight: 700,
              fontSize: isMobile ? '1.25rem' : isTablet ? '1.5rem' : '1.75rem',
            }}
          >
            Create New Post
          </Typography>
          <PostForm />
        </Paper>

        {items.length > 0 && (
          <Paper
            elevation={1}
            sx={{
              p: isMobile ? 3 : isTablet ? 4 : 5,
              borderRadius: 3,
              animation: 'slideInUp 0.3s ease-out 0.2s both',
              '@keyframes slideInUp': {
                '0%': { opacity: 0, transform: 'translateY(30px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none',
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: 'text.secondary',
                mb: isMobile ? 2 : 3,
                fontWeight: 600,
                fontSize: isMobile ? '1.1rem' : isTablet ? '1.25rem' : '1.5rem',
              }}
            >
              Search Posts ({items.length} available)
            </Typography>
            <PostFilter filter={filter} setFilter={setFilter} />
          </Paper>
        )}

        <Paper
          elevation={1}
          sx={{
            p: isMobile ? 3 : isTablet ? 4 : 5,
            borderRadius: 3,
            animation: 'slideInUp 0.3s ease-out 0.3s both',
            '@keyframes slideInUp': {
              '0%': { opacity: 0, transform: 'translateY(30px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none',
            },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: 'primary.main',
              mb: isMobile ? 2 : 3,
              fontWeight: 700,
              fontSize: isMobile ? '1.25rem' : isTablet ? '1.5rem' : '1.75rem',
            }}
          >
            Posts ({items.length})
          </Typography>
          <PostList posts={items} filter={filter} />
        </Paper>
      </Box>
    );
  };

  return (
    <>
      <ThemeToggle />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: 'var(--mui-palette-background-paper)',
            color: 'var(--mui-palette-text-primary)',
            fontWeight: 500,
            borderRadius: 12,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid var(--mui-palette-divider)',
            fontSize: '0.875rem',
            padding: '12px 16px',
          },
        }}
      />
      <Container
        maxWidth={false}
        sx={{
          py: isMobile ? 3 : isTablet ? 4 : 6,
          px: isMobile ? 2 : isTablet ? 3 : 4,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: isMobile ? 3 : isTablet ? 4 : 5,
        }}
      >
        <Box
          textAlign="center"
          sx={{
            mb: isMobile ? 3 : isTablet ? 4 : 6,
            width: '100%',
            maxWidth: isDesktop ? '800px' : '100%',
            animation: 'fadeInDown 0.5s ease-out',
            '@keyframes fadeInDown': {
              '0%': { opacity: 0, transform: 'translateY(-20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
            '@media (prefers-reduced-motion: reduce)': {
              animation: 'none',
            },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              background:
                'linear-gradient(135deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-secondary-main) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.025em',
              fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3.5rem',
              lineHeight: 1.2,
              mb: isMobile ? 1 : 2,
            }}
          >
            TCIT Blog Posts
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              fontSize: isMobile ? '0.875rem' : isTablet ? '1rem' : '1.125rem',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.5,
            }}
          >
            Manage your posts efficiently with a modern, accessible interface
          </Typography>
        </Box>
        {renderContent()}
      </Container>
    </>
  );
};

export default App;
