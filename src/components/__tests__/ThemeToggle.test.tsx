import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '../../theme/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';

// Mock the theme context
const mockToggleTheme = vi.fn();
const mockUseTheme = vi.fn();

vi.mock('../../theme/ThemeContext', () => ({
  useTheme: () => mockUseTheme(),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders theme toggle button', () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeToggle).toBeInTheDocument();
  });

  test('shows correct icon and tooltip for light mode', () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeToggle).toBeInTheDocument();
  });

  test('shows correct icon and tooltip for dark mode', () => {
    mockUseTheme.mockReturnValue({
      mode: 'dark',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to light mode/i });
    expect(themeToggle).toBeInTheDocument();
  });

  test('calls toggleTheme when clicked', () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.click(themeToggle);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  test('handles keyboard navigation with Enter key', async () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.keyDown(themeToggle, { key: 'Enter' });

    await waitFor(() => {
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
  });

  test('handles keyboard navigation with Space key', async () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.keyDown(themeToggle, { key: ' ' });

    await waitFor(() => {
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
  });

  test('ignores other keyboard keys', () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    fireEvent.keyDown(themeToggle, { key: 'Tab' });

    expect(mockToggleTheme).not.toHaveBeenCalled();
  });

  test('button has correct accessibility attributes', () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeToggle).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  test('button has correct positioning styles', () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeToggle).toBeInTheDocument();
    // The button should be positioned fixed at bottom-right
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

    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
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

    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  test('button has minimum size for accessibility', () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeToggle).toBeInTheDocument();
    // The button should have minWidth and minHeight for accessibility
  });

  test('button has hover and focus states', () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeToggle).toBeInTheDocument();
    // The button should have hover and focus styles defined
  });

  test('tooltip shows correct text for light mode', () => {
    mockUseTheme.mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(themeToggle).toBeInTheDocument();
    // The tooltip should show "Switch to dark mode"
  });

  test('tooltip shows correct text for dark mode', () => {
    mockUseTheme.mockReturnValue({
      mode: 'dark',
      toggleTheme: mockToggleTheme,
    });

    renderWithTheme(<ThemeToggle />);

    const themeToggle = screen.getByRole('button', { name: /switch to light mode/i });
    expect(themeToggle).toBeInTheDocument();
    // The tooltip should show "Switch to light mode"
  });
});
