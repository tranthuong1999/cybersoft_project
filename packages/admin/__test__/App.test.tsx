import React from 'react';
import {
  screen,
  waitForDomChange,
} from '@testing-library/dom';
import { render } from '../src/utils/customTestRender';
import App from '../src/App';

describe('App component', () => {
  test('it renders', async () => {
    render(<App />);

    await waitForDomChange(() => {});
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
