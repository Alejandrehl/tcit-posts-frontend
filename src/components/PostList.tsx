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
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import { Trash2 } from 'lucide-react';
import { useAppDispatch } from '@app/store';
import { deletePost } from '@features/posts/postsThunks';
import { useAppSelector } from '@app/hooks';
import { Post } from '@features/posts/types';
import toast from 'react-hot-toast';

interface PostListProps {
  posts?: Post[];
  filter: string;
}

const EmptyStateIcon: React.FC = () => (
  <Box
    component="svg"
    width="120"
    height="120"
    viewBox="0 0 120 120"
    sx={{ mb: 2, opacity: 0.6, color: 'primary.main' }}
  >
    <defs>
      <linearGradient id="emptyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <rect
      x="20"
      y="30"
      width="80"
      height="60"
      rx="8"
      fill="url(#emptyGradient)"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.5"
    />
    <rect x="30" y="40" width="60" height="8" rx="4" fill="currentColor" opacity="0.7" />
    <rect x="30" y="55" width="40" height="6" rx="3" fill="currentColor" opacity="0.5" />
    <rect x="30" y="65" width="50" height="6" rx="3" fill="currentColor" opacity="0.5" />
    <circle cx="85" cy="45" r="8" fill="currentColor" opacity="0.7" />
  </Box>
);

const SearchEmptyIcon: React.FC = () => (
  <Box
    component="svg"
    width="100"
    height="100"
    viewBox="0 0 100 100"
    sx={{ mb: 2, opacity: 0.6, color: 'primary.main' }}
  >
    <defs>
      <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <circle cx="40" cy="40" r="25" fill="none" stroke="url(#searchGradient)" strokeWidth="3" />
    <line
      x1="55"
      y1="55"
      x2="70"
      y2="70"
      stroke="url(#searchGradient)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="40" cy="40" r="8" fill="currentColor" opacity="0.7" />
  </Box>
);

export const PostList: React.FC<PostListProps> = ({ posts = [], filter }) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector((state) => state.posts.deleteLoading);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

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

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  if (!posts.length) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="300px"
        sx={{
          background:
            'linear-gradient(135deg, rgba(var(--mui-palette-primary-main), 0.05) 0%, rgba(var(--mui-palette-secondary-main), 0.05) 100%)',
          borderRadius: 3,
          p: 4,
          border: '2px dashed',
          borderColor: 'divider',
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
        <EmptyStateIcon />
        <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
          No posts available
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: 300 }}>
          Create your first post using the form above to get started
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
        minHeight="300px"
        sx={{
          background:
            'linear-gradient(135deg, rgba(var(--mui-palette-primary-main), 0.05) 0%, rgba(var(--mui-palette-secondary-main), 0.05) 100%)',
          borderRadius: 3,
          p: 4,
          border: '2px dashed',
          borderColor: 'divider',
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
        <SearchEmptyIcon />
        <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
          No results found
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: 300 }}>
          Try different search terms or check your spelling
        </Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={isMobile ? 2 : 3}
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
      {filteredPosts.map((post, index) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card
            tabIndex={0}
            aria-label={`Post: ${post.name}`}
            onKeyDown={(e) => handleKeyDown(e, () => {})}
            sx={{
              position: 'relative',
              outline: 'none',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              transition: 'all 0.3s ease-in-out',
              animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`,
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
              '&:hover': {
                transform: 'translateY(-4px)',
                '& .delete-button': {
                  opacity: 1,
                  transform: 'scale(1)',
                },
              },
              '&:focus': {
                transform: 'translateY(-2px)',
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2,
              },
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
                animation: 'none',
                '&:hover': {
                  transform: 'none',
                },
                '&:focus': {
                  transform: 'none',
                },
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, pb: 6, p: isMobile ? 2 : 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    lineHeight: 1.3,
                    flex: 1,
                    pr: 1,
                    fontSize: isMobile ? '1rem' : '1.1rem',
                  }}
                >
                  {post.name}
                </Typography>
                <Chip
                  label={`ID: ${post.id}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.7rem',
                    height: '24px',
                    minWidth: 'auto',
                    fontWeight: 500,
                    borderColor: 'divider',
                    color: 'text.secondary',
                    backgroundColor: 'action.hover',
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
                  fontWeight: 400,
                }}
              >
                {post.description}
              </Typography>
            </CardContent>
            <IconButton
              className="delete-button"
              aria-label="Delete post"
              onClick={() => handleDelete(post.id)}
              onKeyDown={(e) => handleKeyDown(e, () => handleDelete(post.id))}
              disabled={deleteLoading === post.id}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'error.main',
                color: 'error.contrastText',
                opacity: 0,
                transform: 'scale(0.8)',
                transition: 'all 0.2s ease-in-out',
                minWidth: 44,
                minHeight: 44,
                '&:hover': {
                  backgroundColor: 'error.dark',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
                '&:disabled': {
                  backgroundColor: 'action.disabledBackground',
                  color: 'action.disabled',
                  transform: 'scale(0.8)',
                  opacity: 0.5,
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
              }}
              tabIndex={0}
            >
              {deleteLoading === post.id ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <Trash2 size={18} />
              )}
            </IconButton>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
