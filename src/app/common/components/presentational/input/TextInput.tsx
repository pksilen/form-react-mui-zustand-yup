import { TextField } from '@mui/material';
import React from 'react';

export type TextInputProps = {
  classes?: string;
  error?: string | null | undefined;
  label?: string;
  maxLength?: number | undefined;
  required?: boolean;
};

export const TextInput = React.forwardRef(
  ({ classes, error, label, maxLength, required, ...restOfProps }: TextInputProps, ref) => (
    <TextField
      className={classes}
      error={!!error}
      helperText={error}
      inputProps={{ maxLength }}
      label={label}
      margin="normal"
      required={required}
      {...restOfProps}
    />
  )
);
