import React from 'react';

import { MuiButton } from './styles';

type ButtonType = 'button' | 'submit' | 'reset';
type ButtonCategory = 'confirm' | 'cancel';

export interface ButtonProps {
  $label: string;
  type?: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
  $category: ButtonCategory;
}

const Button = (props: ButtonProps) => {
  const { $label } = props;

  return (
    <MuiButton variant="outlined" color="primary" {...props}>
      {$label}
    </MuiButton>
  );
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  disabled: false,
};

export default Button;
