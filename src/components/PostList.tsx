import React from 'react';
import { Card, CardContent, Typography, IconButton, Grid, CircularProgress } from '@mui/material';
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

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deletePost(id)).unwrap();
      toast.success('Post deleted');
    } catch {
      toast.error('Failed to delete post');
    }
  };

  if (!posts.length) {
    return (
      <Typography variant="body1" align="center" sx={{ mt: 4 }}>
        No posts found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {filteredPosts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card
            tabIndex={0}
            aria-label={`Post: ${post.name}`}
            sx={{ position: 'relative', outline: 'none' }}
          >
            <CardContent>
              <Typography variant="h6">{post.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {post.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(post.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
            <IconButton
              aria-label="Delete post"
              onClick={() => handleDelete(post.id)}
              disabled={deleteLoading === post.id}
              sx={{ position: 'absolute', top: 8, right: 8 }}
              tabIndex={0}
            >
              {deleteLoading === post.id ? <CircularProgress size={24} /> : <DeleteIcon />}
            </IconButton>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
