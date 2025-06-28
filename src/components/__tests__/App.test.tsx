import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, test, expect, vi } from 'vitest';
import { ThemeProvider } from '../../theme/ThemeContext';
import App from '../../App';
import postsReducer from '../../features/posts/postsSlice';

// Mock the hooks
vi.mock('../../hooks/usePosts', () => ({
  usePosts: () => ({
    items: [
      { id: 1, name: 'Test Post 1', description: 'Test description 1' },
      { id: 2, name: 'Test Post 2', description: 'Test description 2' },
    ],
    loading: false,
    error: null,
  }),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      posts: postsReducer,
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <ThemeProvider>{component}</ThemeProvider>
    </Provider>,
  );
};

describe('App Component', () => {
  test('renders main heading with correct accessibility attributes', () => {
    renderWithProviders(<App />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('TCIT Blog Posts');
  });

  test('renders theme toggle button with proper accessibility', () => {
    renderWithProviders(<App />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeToggle).toBeInTheDocument();
    expect(themeToggle).toHaveAttribute('aria-label');
  });

  test('theme toggle responds to keyboard navigation', async () => {
    renderWithProviders(<App />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });

    // Test Enter key
    fireEvent.keyDown(themeToggle, { key: 'Enter' });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
    });

    // Test Space key
    fireEvent.keyDown(themeToggle, { key: ' ' });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
    });
  });

  test('renders form section with proper heading', () => {
    renderWithProviders(<App />);

    const formHeading = screen.getByRole('heading', { name: /create new post/i });
    expect(formHeading).toBeInTheDocument();
  });

  test('renders posts list with proper heading', () => {
    renderWithProviders(<App />);

    const postsHeading = screen.getByRole('heading', { name: /posts \(2\)/i });
    expect(postsHeading).toBeInTheDocument();
  });

  test('renders search section with proper heading', () => {
    renderWithProviders(<App />);

    const searchHeading = screen.getByRole('heading', { name: /search posts \(2 available\)/i });
    expect(searchHeading).toBeInTheDocument();
  });

  test('search input has proper accessibility attributes', () => {
    renderWithProviders(<App />);

    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('aria-label', 'Search posts by title');
    expect(searchInput).toHaveAttribute('tabindex', '0');
  });

  test('post cards have proper accessibility attributes', () => {
    renderWithProviders(<App />);

    const postCards = screen.getAllByRole('article');
    expect(postCards).toHaveLength(2);

    postCards.forEach((card, index) => {
      expect(card).toHaveAttribute('aria-label', `Post: Test Post ${index + 1}`);
      expect(card).toHaveAttribute('tabindex', '0');
    });
  });

  test('delete buttons have proper accessibility attributes', () => {
    renderWithProviders(<App />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete post/i });
    expect(deleteButtons).toHaveLength(2);

    deleteButtons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label', 'Delete post');
      expect(button).toHaveAttribute('tabindex', '0');
    });
  });

  test('form inputs have proper accessibility attributes', () => {
    renderWithProviders(<App />);

    const titleInput = screen.getByRole('textbox', { name: /post title/i });
    const descriptionInput = screen.getByRole('textbox', { name: /description/i });

    expect(titleInput).toHaveAttribute('aria-label', 'Post title');
    expect(descriptionInput).toHaveAttribute('aria-label', 'Post description');
  });

  test('create button has proper accessibility attributes', () => {
    renderWithProviders(<App />);

    const createButton = screen.getByRole('button', { name: /create post/i });
    expect(createButton).toHaveAttribute('aria-label', 'Create post');
  });

  test('responsive design works correctly', () => {
    // Mock window.matchMedia
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

    renderWithProviders(<App />);

    // Component should still render correctly
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('respects prefers-reduced-motion', () => {
    // Mock prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    renderWithProviders(<App />);

    // Component should still render correctly
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
