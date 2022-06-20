import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ProfileConfig from './ProfileConfig';


describe.skip('ProfileConfig', () => {
  it('ProfileConfig 원하는 프로필을 선택하면 프로필이 바뀐다', async () => {
    render(<ProfileConfig />);

    const laVieEnRoseRadio = screen.getByRole('radio', {
      name: /la-vie-en-rose/
    });
    userEvent.click(laVieEnRoseRadio);

    await screen.findByText('선택한 테마 : la-vie-en-rose');

    const eatingTripRadio = screen.getByRole('radio', {
      name: /eating-trip-3/
    });
    userEvent.click(eatingTripRadio);

    await screen.findByText('선택한 테마 : eating-trip-3');
  });
});
