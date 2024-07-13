// ./storybook/manager.ts
import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'

const theme = create({
  base: 'dark', // this will inherit the base properties of Storybooks'light the
  // Base color
  colorSecondary: '#45bc5a', // Chateau Green

  // Brand assets
  brandTitle: 'Storybook',
})

addons.setConfig({
  theme,
})