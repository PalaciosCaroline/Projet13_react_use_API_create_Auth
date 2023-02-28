import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  test('renders the component correctly', () => {
    render(<Home />);
    const titleh2 = screen.getByText('Features');
    expect(titleh2).toBeInTheDocument();
  });
});