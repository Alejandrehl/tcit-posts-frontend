import React from 'react';
import { TextField, Box, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { Search } from 'lucide-react';

interface PostFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

export const PostFilter: React.FC<PostFilterProps> = ({ filter, setFilter }) => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        animation: 'fadeIn 0.3s ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
        },
      }}
    >
      <TextField
        label="Search posts by title"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
        variant="outlined"
        placeholder="Type to filter posts..."
        InputProps={{
          startAdornment: (
            <Search
              size={isMobile ? 18 : isTablet ? 20 : 22}
              color="currentColor"
              style={{ opacity: 0.7 }}
            />
          ),
        }}
        inputProps={{
          'aria-label': 'Search posts by title',
          tabIndex: 0,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              '& .lucide': {
                transform: 'scale(1.1)',
                opacity: 1,
              },
            },
            '&.Mui-focused': {
              transform: 'translateY(-2px)',
              '& .lucide': {
                transform: 'scale(1.2)',
                opacity: 1,
              },
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover': {
                transform: 'none',
                '& .lucide': {
                  transform: 'none',
                },
              },
              '&.Mui-focused': {
                transform: 'none',
                '& .lucide': {
                  transform: 'none',
                },
              },
            },
          },
          '& .lucide': {
            transition: 'all 0.2s ease-in-out',
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
            },
          },
        }}
      />
    </Box>
  );
};
