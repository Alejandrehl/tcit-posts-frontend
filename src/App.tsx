import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { PostForm } from '@components/PostForm';
import { PostFilter } from '@components/PostFilter';
import { PostList } from '@components/PostList';
import { usePosts } from '@hooks/usePosts';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App: React.FC = () => {
  const { items, loading, error } = usePosts();
  const [filter, setFilter] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          TCIT Blog Posts
        </Typography>
        <PostForm />
        <PostFilter filter={filter} setFilter={setFilter} />
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center" mt={4}>
            {error}
          </Typography>
        ) : (
          <PostList posts={items} filter={filter} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
