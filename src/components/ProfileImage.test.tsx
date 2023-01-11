import React from 'react';

import ProfileImage from './ProfileImage';
import { waitFor } from '@testing-library/react';
import { render } from './testUtil';

describe('ProfileImage', () => {
  it('base size', async () => {
    const { screen } = await render(<ProfileImage member="권은비" size="base" theme="la-vie-en-rose" />);
    const image = await screen.findByRole('img');

    await waitFor(() => {
      expect(image).toHaveAttribute('src', 'http://localhost:8000/img/profile/la-vie-en-rose/권은비.jpg');
      expect(image).toHaveAttribute('width', '48');
    });
  });
  
  it('md size', async () => {
    const { screen } = await render(<ProfileImage member="운영팀" size="md" theme="la-vie-en-rose" />);
    
    const image = await screen.findByRole('img');

    expect(image).toHaveAttribute('src', 'http://localhost:8000/img/izone-logo.png');
    expect(image).toHaveAttribute('width', '32');
  });

  it('sm size', async () => {
    const { screen } = await render(<ProfileImage member="" size="base" theme="la-vie-en-rose" />);
    
    const image = await screen.findByRole('img');
    
    expect(image).toHaveAttribute('src', 'http://localhost:8000/img/izone-logo.png');
    expect(image).toHaveAttribute('width', '48');
  });
});
