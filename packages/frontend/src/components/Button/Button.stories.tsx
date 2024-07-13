import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import Button from './Button';
import theme from '../../themes/RootTheme';

export default {
  component: Button,
  decorators: [
    (Story) => (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </StylesProvider>
    ),
  ],
} as ComponentMeta<typeof Button>;

export const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

export const Confirm = Template.bind({});
export const Cancel = Template.bind({});
export const Disabled = Template.bind({});

Confirm.args = {
  $label: 'Save',
  $category: 'confirm',
};

Cancel.args = {
  $label: 'Cancel',
  $category: 'cancel',
};

Disabled.args = {
  $label: 'Save',
  $category: 'confirm',
  disabled: true,
};
