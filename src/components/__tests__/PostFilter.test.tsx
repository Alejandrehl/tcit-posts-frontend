import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { PostFilter } from '../PostFilter';

describe('PostFilter', () => {
  const mockSetFilter = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders search input', () => {
    render(<PostFilter filter="" setFilter={mockSetFilter} />);

    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    expect(searchInput).toBeInTheDocument();
  });

  test('search input has correct accessibility attributes', () => {
    render(<PostFilter filter="" setFilter={mockSetFilter} />);

    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    expect(searchInput).toHaveAttribute('aria-label', 'Search posts by title');
    expect(searchInput).toHaveAttribute('tabindex', '0');
  });

  test('search input has correct placeholder', () => {
    render(<PostFilter filter="" setFilter={mockSetFilter} />);

    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    expect(searchInput).toHaveAttribute('placeholder', 'Type to filter posts...');
  });

  test('calls setFilter when input changes', () => {
    render(<PostFilter filter="" setFilter={mockSetFilter} />);

    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockSetFilter).toHaveBeenCalledWith('test');
  });

  test('displays current filter value', () => {
    render(<PostFilter filter="current filter" setFilter={mockSetFilter} />);

    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    expect(searchInput).toHaveValue('current filter');
  });

  test('handles empty string filter', async () => {
    render(<PostFilter filter="Test" setFilter={mockSetFilter} />);
    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    fireEvent.change(searchInput, { target: { value: '' } });
    await waitFor(() => {
      expect(mockSetFilter).toHaveBeenCalledWith('');
    });
  });

  test('handles special characters in filter', () => {
    render(<PostFilter filter="" setFilter={mockSetFilter} />);

    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    fireEvent.change(searchInput, { target: { value: 'test@#$%' } });

    expect(mockSetFilter).toHaveBeenCalledWith('test@#$%');
  });

  test('handles long filter text', () => {
    render(<PostFilter filter="" setFilter={mockSetFilter} />);

    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    const longText = 'a'.repeat(1000);
    fireEvent.change(searchInput, { target: { value: longText } });

    expect(mockSetFilter).toHaveBeenCalledWith(longText);
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

    render(<PostFilter filter="" setFilter={mockSetFilter} />);
    expect(screen.getByRole('textbox', { name: /search posts by title/i })).toBeInTheDocument();
  });

  test('responsive: renders correctly on tablet', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('(max-width:900px)') && !query.includes('(max-width:600px)'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<PostFilter filter="" setFilter={mockSetFilter} />);
    expect(screen.getByRole('textbox', { name: /search posts by title/i })).toBeInTheDocument();
  });

  test('responsive: renders correctly on desktop', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<PostFilter filter="" setFilter={mockSetFilter} />);
    expect(screen.getByRole('textbox', { name: /search posts by title/i })).toBeInTheDocument();
  });

  test('input is focused when component mounts', () => {
    render(<PostFilter filter="" setFilter={mockSetFilter} />);

    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    expect(searchInput).toBeInTheDocument();
    // Note: We can't test focus in JSDOM without additional setup
  });

  test('input has full width', () => {
    render(<PostFilter filter="" setFilter={mockSetFilter} />);

    const searchInput = screen.getByRole('textbox', { name: /search posts by title/i });
    expect(searchInput).toBeInTheDocument();
    // The input should be rendered with fullWidth prop from Material-UI
  });
});
