import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from './types';
import { fetchPosts, createPost, deletePost } from './postsThunks';

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  deleteLoading: string | null;
  fetched: boolean;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  createLoading: false,
  deleteLoading: null,
  fetched: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loading = false;
        state.fetched = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      // Create
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.unshift(action.payload);
        state.createLoading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.error.message || 'Failed to create post';
      })
      // Delete
      .addCase(deletePost.pending, (state, action) => {
        state.deleteLoading = action.meta.arg;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((post: Post) => post.id !== action.payload);
        state.deleteLoading = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deleteLoading = null;
        state.error = action.error.message || 'Failed to delete post';
      });
  },
});

export default postsSlice.reducer;
