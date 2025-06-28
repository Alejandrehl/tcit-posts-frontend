import React, { useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  CssBaseline,
  Alert,
  Paper,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { PostForm } from '@components/PostForm';
import { PostFilter } from '@components/PostFilter';
import { PostList } from '@components/PostList';
import { usePosts } from '@hooks/usePosts';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      color: '#1976d2',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const App: React.FC = () => {
  const { items, loading, error } = usePosts();
  const [filter, setFilter] = useState('');

  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress size={60} />
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
            '& .MuiAlert-message': {
              fontSize: '1rem',
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
      <>
        {/* Form */}
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', mb: 2 }}>
            Create New Post
          </Typography>
          <PostForm />
        </Paper>

        {/* Search bar - only if there are posts */}
        {items.length > 0 && (
          <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#666', mb: 2 }}>
              Search Posts ({items.length} available)
            </Typography>
            <PostFilter filter={filter} setFilter={setFilter} />
          </Paper>
        )}

        {/* Post list */}
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', mb: 2 }}>
            Posts ({items.length})
          </Typography>
          <PostList posts={items} filter={filter} />
        </Paper>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Main title */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            TCIT Blog Posts
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            Manage your posts efficiently
          </Typography>
        </Box>

        {/* Main content */}
        {renderContent()}
      </Container>
    </ThemeProvider>
  );
};

export default App;
