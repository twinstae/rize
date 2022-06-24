import { render, screen } from '@testing-library/react';
import React from 'react';

import { MEMBER_LIST } from '../constants';
import ProfileImage from './ProfileImage';

describe('ProfileImage', () => {
  it('base size', async () => {
    render(<ProfileImage member={MEMBER_LIST[11]} size="base" theme="la-vie-en-rose" />);
    
    const image = await screen.findByAltText('img/profile/la-vie-en-rose/장원영.jpg');

    expect(image.getAttribute('width')).toBe('48');
  });
  
  it('md size', async () => {
    render(<ProfileImage member="운영팀" size="md" theme="la-vie-en-rose" />);
    
    const image = await screen.findByAltText('img/izone-logo.png');

    expect(image.getAttribute('src')).toBe('http://localhost:8000/img/izone-logo.png');
    expect(image.getAttribute('width')).toBe('32');
  });

  it('sm size', async () => {
    render(<ProfileImage member="" size="base" theme="la-vie-en-rose" />);
    
    const image = await screen.findByAltText('img/izone-logo.png');

    expect(image.getAttribute('src')).toBe('http://localhost:8000/img/izone-logo.png');
    expect(image.getAttribute('width')).toBe('48');
  });
});
