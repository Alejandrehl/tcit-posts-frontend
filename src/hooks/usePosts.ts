import { useEffect } from 'react';
import { useAppDispatch } from '@app/store';
import { useAppSelector } from '@app/hooks';
import { fetchPosts } from '@features/posts/postsThunks';
import type { RootState } from '@app/store';

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, fetched, createLoading, deleteLoading } = useAppSelector(
    (state: RootState) => state.posts,
  );

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchPosts());
    }
  }, [dispatch, fetched]);

  return { items, loading, error, createLoading, deleteLoading };
};
