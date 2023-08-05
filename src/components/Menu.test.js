import React from 'react';
import { render } from '@testing-library/react';
import Menu from './Menu';

test('renders "HELLO WORLD" text', () => {
  const { getByText } = render(<Menu />);
  const helloWorldElement = getByText(/HELLO WORLD/i);
  expect(helloWorldElement).toBeInTheDocument();
});