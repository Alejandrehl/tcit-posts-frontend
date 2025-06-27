import React, { useState } from 'react';
import { Box, Button, TextField, Paper } from '@mui/material';
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
      toast.success('Post created!');
      setName('');
      setDescription('');
    } catch {
      toast.error('Failed to create post');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          inputProps={{ 'aria-label': 'Post name' }}
          disabled={createLoading}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          inputProps={{ 'aria-label': 'Post description' }}
          disabled={createLoading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={createLoading}
          aria-label="Create post"
        >
          {createLoading ? 'Creating...' : 'Create Post'}
        </Button>
      </Box>
    </Paper>
  );
};
