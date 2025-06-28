import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../features/posts/postsSlice';
import { PostForm } from '../PostForm';

declare global {
  var mockToast: ReturnType<typeof vi.fn>;
  var mockToastError: ReturnType<typeof vi.fn>;
  var mockToastSuccess: ReturnType<typeof vi.fn>;
}

vi.mock('react-hot-toast', () => {
  globalThis.mockToast = vi.fn();
  globalThis.mockToastError = vi.fn();
  globalThis.mockToastSuccess = vi.fn();
  return {
    default: Object.assign(globalThis.mockToast, {
      error: globalThis.mockToastError,
      success: globalThis.mockToastSuccess,
    }),
  };
});

const mockDispatch = vi.fn();
const mockUseAppSelector = vi.fn();

vi.mock('../../app/store', () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock('../../app/hooks', () => ({
  useAppSelector: (...args: unknown[]) => mockUseAppSelector(...args),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      posts: postsReducer,
    },
  });

describe('PostForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.mockToast.mockClear();
    globalThis.mockToastError.mockClear();
    globalThis.mockToastSuccess.mockClear();
    // By default, createLoading: false
    mockUseAppSelector.mockImplementation((selector) => {
      if (typeof selector === 'function') {
        return selector({ posts: { createLoading: false } });
      }
      return { createLoading: false };
    });
    mockDispatch.mockReset();
  });

  test('shows error when submitting with both fields empty', async () => {
    render(
      <Provider store={createTestStore()}>
        <PostForm />
      </Provider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /create post/i }));
    await waitFor(() => {
      expect(globalThis.mockToastError).toHaveBeenCalledWith('Name and description are required');
    });
  });

  test('submits form successfully with valid data and clears inputs', async () => {
    mockDispatch.mockImplementation(() => Promise.resolve({ type: 'posts/addPost/fulfilled' }));
    render(
      <Provider store={createTestStore()}>
        <PostForm />
      </Provider>,
    );
    fireEvent.change(screen.getByLabelText(/post title/i), { target: { value: 'Test title' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test desc' } });
    fireEvent.click(screen.getByRole('button', { name: /create post/i }));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(globalThis.mockToastSuccess).toHaveBeenCalledWith('Post created successfully!');
      expect(screen.getByLabelText(/post title/i)).toHaveValue('');
      expect(screen.getByLabelText(/description/i)).toHaveValue('');
    });
  });

  test('shows error when dispatch fails', async () => {
    mockDispatch.mockImplementation(() => Promise.reject(new Error('fail')));
    render(
      <Provider store={createTestStore()}>
        <PostForm />
      </Provider>,
    );
    fireEvent.change(screen.getByLabelText(/post title/i), { target: { value: 'Test title' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test desc' } });
    fireEvent.click(screen.getByRole('button', { name: /create post/i }));
    await waitFor(() => {
      expect(globalThis.mockToastError).toHaveBeenCalledWith('Error creating post');
    });
  });

  test('disables form when loading', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      if (typeof selector === 'function') {
        return selector({ posts: { createLoading: true } });
      }
      return { createLoading: true };
    });
    render(
      <Provider store={createTestStore()}>
        <PostForm />
      </Provider>,
    );
    expect(screen.getByRole('button', { name: /create post/i })).toBeDisabled();
    expect(screen.getByLabelText(/post title/i)).toBeDisabled();
    expect(screen.getByLabelText(/description/i)).toBeDisabled();
  });

  test('form submission prevents default when both fields are empty', async () => {
    const preventDefault = vi.fn();
    render(
      <Provider store={createTestStore()}>
        <PostForm />
      </Provider>,
    );
    const form = screen.getByRole('form');
    fireEvent.submit(form, { preventDefault });
    await waitFor(() => {
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  test('renders correctly on mobile', () => {
    // This is a basic render test for mobile responsiveness
    render(
      <Provider store={createTestStore()}>
        <PostForm />
      </Provider>,
    );
    expect(screen.getByLabelText(/post title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });
});
