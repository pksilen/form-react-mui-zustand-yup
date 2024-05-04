import { Button } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const SubmitButton = ({ children }: Props) => (
  <Button size="large" sx={{ marginTop: '20px' }} type="submit" variant="contained">
    {children}
  </Button>
);
