import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useAppDispatch } from '@app/store';
import { createPost } from '@features/posts/postsThunks';
import { useAppSelector } from '@app/hooks';
import toast from 'react-hot-toast';

export const PostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector((state) => state.posts.createLoading);

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
    <Box component="form" onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Post Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          variant="outlined"
          placeholder="Enter your post title"
          inputProps={{
            'aria-label': 'Post title',
            maxLength: 100,
          }}
          disabled={createLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#1976d2',
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
          rows={3}
          variant="outlined"
          placeholder="Describe your post content"
          inputProps={{
            'aria-label': 'Post description',
            maxLength: 500,
          }}
          disabled={createLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
            },
          }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={createLoading}
            aria-label="Create post"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {createLoading ? 'Creating...' : 'Create Post'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
