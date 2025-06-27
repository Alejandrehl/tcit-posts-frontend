import React from 'react';
import { TextField, Box } from '@mui/material';

interface PostFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

export const PostFilter: React.FC<PostFilterProps> = ({ filter, setFilter }) => (
  <Box mb={2}>
    <TextField
      label="Filter by name"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      fullWidth
      inputProps={{
        'aria-label': 'Filter posts by name',
        tabIndex: 0,
      }}
    />
  </Box>
);
