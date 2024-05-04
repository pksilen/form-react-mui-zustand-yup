import { Alert } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const ErrorAlert = ({ children }: Props) => <Alert severity="error">{children}</Alert>;
