import { Alert } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className: string;
};

export const ErrorAlert = ({ children, className }: Props) => (
  <Alert className={className} severity="error" variant="filled">
    {children}
  </Alert>
);
