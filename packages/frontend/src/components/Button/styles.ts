import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import { PRIMARY_COLOR } from '../../themes/colors';
import { ButtonProps } from './Button';

export const MuiButton = styled(Button)<ButtonProps>`
  background-color: ${(props) =>
    props.$category === 'confirm' ? PRIMARY_COLOR : '#fff'};
  padding: 8px;
  border-radius: 4px;
  border-color: ${PRIMARY_COLOR};
  color: ${(props) => (props.$category === 'confirm' ? '#fff' : PRIMARY_COLOR)};
  font-weight: 600;
  font-size: 14px;
  text-transform: capitalize;
  min-width: 78px;

  :hover {
    background-color: ${(props) =>
      props.$category === 'confirm' ? PRIMARY_COLOR : ''};
  }

  &.MuiButton-outlined.Mui-disabled {
    background-color: #ccc;
    border: 1px solid #ccc;
  }

  &.MuiButton-root.Mui-disabled {
    color: #fff;
  }
`;
