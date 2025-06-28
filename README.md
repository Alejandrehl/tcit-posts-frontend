# TCIT Blog Posts

A modern, accessible React application for managing blog posts with a comprehensive UI overhaul featuring dark mode support, responsive design, and WCAG-AA compliance.

## 🎨 UI Features

### Design System

- **Neutral Light Theme**: Clean, professional design with carefully chosen color palette
- **Dark Mode Support**: Persistent dark mode toggle with system preference detection
- **WCAG-AA Compliance**: All colors meet accessibility contrast requirements
- **Material UI v6**: Modern component library with custom theme extraction
- **Lucide Icons**: Consistent, scalable iconography throughout the application

### Responsive Design

- **CSS Grid & Flexbox**: Modern layout techniques for optimal scaling
- **Mobile-First**: Responsive from 320px to desktop without horizontal scroll
- **Touch-Friendly**: All interactive elements ≥ 44 × 44 px touch targets
- **Breakpoint System**: Optimized for mobile, tablet, and desktop experiences

### Accessibility Features

- **Keyboard Navigation**: Full keyboard support with proper focus management
- **Screen Reader Support**: Comprehensive ARIA labels and semantic HTML
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference
- **High Contrast**: WCAG-AA compliant color combinations
- **Focus Indicators**: Clear, visible focus states for all interactive elements

### Animation & Performance

- **Smooth Transitions**: 200ms transitions with 300ms fade-ins for list items
- **Performance Optimized**: Efficient animations that don't impact usability
- **Lazy Loading**: Native image lazy loading support
- **Reduced Motion Support**: Animations disabled when user prefers reduced motion

### Toast Notifications

- **Auto-Close**: Notifications automatically close after 5 seconds
- **Keyboard Dismissal**: ESC key dismisses active notifications
- **Accessible**: Proper ARIA announcements for screen readers
- **Theme-Aware**: Notifications adapt to current theme mode

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tcit-posts-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run lighthouse   # Run Lighthouse audit
```

## 🏗️ Architecture

### Theme System

- **Extracted Theme**: All colors and styling in dedicated theme files
- **No Hardcoded Colors**: Components use theme tokens exclusively
- **Dark Mode Context**: React context for theme state management
- **System Preference**: Automatically detects user's preferred color scheme

### Component Structure

```
src/
├── components/
│   ├── PostForm.tsx      # Create post form
│   ├── PostFilter.tsx    # Search functionality
│   ├── PostList.tsx      # Posts display grid
│   └── ThemeToggle.tsx   # Dark mode toggle
├── theme/
│   ├── index.ts          # Theme configuration
│   └── ThemeContext.tsx  # Theme context provider
└── features/
    └── posts/            # Redux slice and thunks
```

### State Management

- **Redux Toolkit**: Centralized state management
- **Unchanged Business Logic**: All Redux slices preserved during UI overhaul
- **TypeScript**: Full type safety throughout the application

## 🧪 Testing

### Test Coverage

- **React Testing Library**: Component testing with accessibility focus
- **Accessibility Testing**: Contrast, keyboard navigation, and ARIA label verification
- **Responsive Testing**: Mobile and desktop viewport testing
- **Theme Testing**: Light and dark mode functionality

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## 📊 Performance & Quality

### Lighthouse Scores

The application targets scores above 90 on:

- **Performance**: Optimized loading and rendering
- **Accessibility**: WCAG-AA compliance
- **Best Practices**: Modern web development standards

### Code Quality

- **ESLint**: Strict linting rules for code quality
- **Prettier**: Consistent code formatting
- **TypeScript**: Full type safety
- **Husky**: Pre-commit hooks for quality assurance

## 🎯 Accessibility Guarantees

### WCAG-AA Compliance

- **Color Contrast**: All text meets 4.5:1 contrast ratio
- **Focus Management**: Clear, visible focus indicators
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic structure

### User Experience

- **Reduced Motion**: Animations respect user preferences
- **Touch Targets**: Minimum 44×44px for all interactive elements
- **Responsive Design**: Works on all screen sizes from 320px up
- **Theme Persistence**: User's theme choice is remembered

## 🔧 Development

### Adding New Components

1. Create component in `src/components/`
2. Use theme tokens for styling (no hardcoded colors)
3. Add proper accessibility attributes
4. Include responsive design considerations
5. Add tests for accessibility and functionality

### Theme Customization

1. Modify `src/theme/index.ts` for color changes
2. Update `src/theme/ThemeContext.tsx` for theme logic
3. Test both light and dark modes
4. Verify WCAG-AA compliance

### Accessibility Checklist

- [ ] All interactive elements have proper ARIA labels
- [ ] Keyboard navigation works for all features
- [ ] Color contrast meets WCAG-AA requirements
- [ ] Focus indicators are visible and clear
- [ ] Screen reader announcements are appropriate
- [ ] Reduced motion preferences are respected

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the accessibility guidelines
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📞 Support

For questions or issues, please open an issue in the repository or contact the development team.
