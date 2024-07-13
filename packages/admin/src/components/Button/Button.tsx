import React from 'react';

import { ButtonProps as MuiButtonProps } from '@mui/material';
import { MuiButton } from './styles';

// Only include variant, size, color from MuiButtonProps
type ButtonBaseProps = Pick<
  MuiButtonProps,
  'variant' | 'size' | 'color' | 'disabled'
>;

export interface ButtonProps extends ButtonBaseProps {
  label: string;
}

export const Button = ({ label, ...rest }: ButtonProps) => (
  <MuiButton {...rest}>{label}</MuiButton>
);

Button.defaultProps = {
  variant: 'contained',
  size: 'medium',
  color: 'primary',
  disabled: false,
};

export default Button;
