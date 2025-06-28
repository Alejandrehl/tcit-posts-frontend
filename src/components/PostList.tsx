import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  Box,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '@app/store';
import { deletePost } from '@features/posts/postsThunks';
import { useAppSelector } from '@app/hooks';
import { Post } from '@features/posts/types';
import toast from 'react-hot-toast';

interface PostListProps {
  posts?: Post[];
  filter: string;
}

export const PostList: React.FC<PostListProps> = ({ posts = [], filter }) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector((state) => state.posts.deleteLoading);

  const filteredPosts = posts.filter((post) =>
    post.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deletePost(id)).unwrap();
      toast.success('Post deleted successfully');
    } catch {
      toast.error('Error deleting post');
    }
  };

  if (!posts.length) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="200px"
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No posts available
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Create your first post using the form above
        </Typography>
      </Box>
    );
  }

  if (filteredPosts.length === 0 && filter) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="200px"
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No results found
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Try different search terms
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {filteredPosts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card
            tabIndex={0}
            aria-label={`Post: ${post.name}`}
            sx={{
              position: 'relative',
              outline: 'none',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, pb: 6 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#1976d2',
                    lineHeight: 1.3,
                    flex: 1,
                    pr: 1,
                  }}
                >
                  {post.name}
                </Typography>
                <Chip
                  label={`ID: ${post.id}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.75rem',
                    height: '24px',
                    minWidth: 'auto',
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {post.description}
              </Typography>
            </CardContent>
            <IconButton
              aria-label="Delete post"
              onClick={() => handleDelete(post.id)}
              disabled={deleteLoading === post.id}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'rgba(220, 0, 78, 0.1)',
                color: '#dc004e',
                '&:hover': {
                  backgroundColor: 'rgba(220, 0, 78, 0.2)',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  color: 'rgba(0, 0, 0, 0.3)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              tabIndex={0}
            >
              {deleteLoading === post.id ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
