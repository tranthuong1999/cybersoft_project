import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { addDecorator } from '@storybook/react';
import RootTheme from '../packages/admin/src/themes/RootTheme';
// get from the directory admin current, if there are any changes please edit this

addDecorator((story) => (
  <ThemeProvider theme={RootTheme}>{story()}</ThemeProvider>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
