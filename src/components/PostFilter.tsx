import React from 'react';
import { TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface PostFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

export const PostFilter: React.FC<PostFilterProps> = ({ filter, setFilter }) => (
  <Box>
    <TextField
      label="Search posts by title"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      fullWidth
      variant="outlined"
      placeholder="Type to filter posts..."
      InputProps={{
        startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
      }}
      inputProps={{
        'aria-label': 'Search posts by title',
        tabIndex: 0,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: '#1976d2',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1976d2',
          },
        },
      }}
    />
  </Box>
);
