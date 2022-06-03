import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

describe('App', () => {
  it('App render', () => {
    render(<App />);

    expect(screen.getAllByText(/메일이 없습니다/)).toBeInTheDocument();
  });
});
