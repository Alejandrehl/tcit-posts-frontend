import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import { useAppDispatch } from '@app/store';
import { createPost } from '@features/posts/postsThunks';
import { useAppSelector } from '@app/hooks';
import toast from 'react-hot-toast';
import { Type, FileText, Plus } from 'lucide-react';

export const PostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector((state) => state.posts.createLoading);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      toast.error('Name and description are required');
      return;
    }
    try {
      await dispatch(createPost({ name, description })).unwrap();
      toast.success('Post created successfully!');
      setName('');
      setDescription('');
    } catch {
      toast.error('Error creating post');
    }
  };

  return (
    <Box component="form" role="form" onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        gap={isMobile ? 2 : isTablet ? 3 : 4}
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
        <TextField
          label="Post Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          variant="outlined"
          placeholder="Enter your post title"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Type
                  size={isMobile ? 18 : isTablet ? 20 : 22}
                  color="currentColor"
                  style={{ opacity: 0.7 }}
                />
              </InputAdornment>
            ),
          }}
          inputProps={{
            'aria-label': 'Post title',
            maxLength: 100,
          }}
          disabled={createLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
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
          }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          multiline
          rows={isMobile ? 2 : isTablet ? 3 : 4}
          variant="outlined"
          placeholder="Describe your post content"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                <FileText
                  size={isMobile ? 18 : isTablet ? 20 : 22}
                  color="currentColor"
                  style={{ opacity: 0.7 }}
                />
              </InputAdornment>
            ),
          }}
          inputProps={{
            'aria-label': 'Post description',
            maxLength: 500,
          }}
          disabled={createLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
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
          }}
        />
        <Box display="flex" justifyContent="flex-end" sx={{ mt: isMobile ? 1 : 2 }}>
          <Button
            type="submit"
            variant="contained"
            size={isMobile ? 'medium' : 'large'}
            disabled={createLoading}
            aria-label="Create post"
            startIcon={<Plus size={isMobile ? 18 : isTablet ? 20 : 22} />}
            sx={{
              px: isMobile ? 3 : isTablet ? 4 : 5,
              py: isMobile ? 1.5 : isTablet ? 2 : 2.5,
              fontSize: isMobile ? '0.875rem' : isTablet ? '1rem' : '1.125rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              letterSpacing: '0.025em',
              minHeight: isMobile ? 44 : isTablet ? 48 : 52,
              minWidth: isMobile ? 44 : isTablet ? 48 : 52,
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
            }}
          >
            {createLoading ? 'Creating...' : 'Create Post'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
