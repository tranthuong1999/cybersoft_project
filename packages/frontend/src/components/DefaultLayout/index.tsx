import React from 'react';
import { Wrapper } from './styles';

interface IDefaultLayoutProps {
  children: any;
}

const DefaultLayout = ({ children }: IDefaultLayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default DefaultLayout;
