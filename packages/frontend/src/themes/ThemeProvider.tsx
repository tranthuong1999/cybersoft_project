import React from 'react';
import { ThemeProvider as ThemeWrapper } from 'styled-components';
import rootTheme from './RootTheme';

interface IThemeProvider {
  children: any;
}

const ThemeProvider = ({ children }: IThemeProvider) => {
  return <ThemeWrapper theme={rootTheme}>{children}</ThemeWrapper>;
};

export default ThemeProvider;
