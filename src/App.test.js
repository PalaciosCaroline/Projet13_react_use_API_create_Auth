import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByTestId('containerApp');
//   expect(linkElement).toBeInTheDocument();
// });

describe('App', () => {
  test('renders HeaderPage component', () => {
    render(<App />);
    const header = screen.getByTestId('header-page');
    expect(header).toBeInTheDocument();
  });
});