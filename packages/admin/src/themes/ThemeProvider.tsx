import React from 'react';
import { ThemeProvider } from 'styled-components';
import rootTheme from './RootTheme';

const Theme = ({ children }: any) => {
  return <ThemeProvider theme={rootTheme}>{children}</ThemeProvider>;
};

export default Theme;
