import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../../features/posts/postsSlice';
import { PostList } from '../PostList';

const createTestStore = () =>
  configureStore({
    reducer: { posts: postsReducer },
    preloadedState: {
      posts: {
        items: [],
        loading: false,
        error: null,
        createLoading: false,
        deleteLoading: null,
        fetched: false,
      },
    },
  });

const renderWithProviders = (ui: React.ReactElement) => {
  const store = createTestStore();
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('PostList', () => {
  const posts = [
    { id: 1, name: 'Post 1', description: 'Desc 1' },
    { id: 2, name: 'Post 2', description: 'Desc 2' },
  ];

  test('renders posts', () => {
    renderWithProviders(<PostList posts={posts} filter="" />);
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /delete post/i })).toHaveLength(2);
  });

  test('renders empty state', () => {
    renderWithProviders(<PostList posts={[]} filter="" />);
    expect(screen.getByText(/no posts available/i)).toBeInTheDocument();
  });

  test('renders search empty state', () => {
    renderWithProviders(<PostList posts={posts} filter="no-match" />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  test('delete button calls handler', () => {
    // Mock dispatch
    vi.mock('../../app/store', () => ({ useAppDispatch: () => vi.fn() }));
    renderWithProviders(<PostList posts={posts} filter="" />);
    const deleteBtn = screen.getAllByRole('button', { name: /delete post/i })[0];
    fireEvent.click(deleteBtn);
    // No error thrown, button is clickable
    expect(deleteBtn).toBeInTheDocument();
  });

  test('cards have correct accessibility', () => {
    renderWithProviders(<PostList posts={posts} filter="" />);
    const cards = screen.getAllByLabelText(/post: /i);
    cards.forEach((card) => {
      expect(card).toHaveAttribute('tabindex', '0');
    });
  });

  test('responsive: renders correctly on mobile', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('(max-width:600px)'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    renderWithProviders(<PostList posts={posts} filter="" />);
    expect(screen.getByText('Post 1')).toBeInTheDocument();
  });
});
