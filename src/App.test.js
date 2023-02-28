// import { render, screen } from '@testing-library/react';
// import App from './App';
// import HeaderPage from './components/HeaderPage'

// test('renders learn react link', () => {
//   render(<App />);
//   const title = screen.getByText(/Argent/i);
//   expect(title).toBeInTheDocument();
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';

describe('App', () => {
  test('renders the component correctly', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const title = screen.getByText(/Argent/i);
    expect(title).toBeInTheDocument();
    const container = screen.getByTestId('containerApp');
    expect(container).toBeInTheDocument();
  });
});




