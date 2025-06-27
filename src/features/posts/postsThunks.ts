import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@utils/ApiClient';
import { Post } from './types';

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
  const data = await apiClient.get<{ posts: Post[] }>('/v1/posts');
  return data.posts;
});

export const createPost = createAsyncThunk<Post, { name: string; description: string }>(
  'posts/createPost',
  async (payload) => {
    const data = await apiClient.post<Post>('/v1/posts', payload);
    return data;
  },
);

export const deletePost = createAsyncThunk<string, string>('posts/deletePost', async (id) => {
  await apiClient.delete(`/v1/posts/${id}`);
  return id;
});
