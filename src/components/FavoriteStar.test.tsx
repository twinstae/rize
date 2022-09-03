import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import FavoriteStar from './FavoriteStar';

describe('FavoriteStar', () => {
  it('중요 표시 버튼을 누르면 중요 표시가 된다', async () => {
    render(<FavoriteStar mailId="m25731"/>);

    const before = await screen.findByLabelText('중요 표시');
    fireEvent.click(before);

    const after = await screen.findByLabelText('중요');
    fireEvent.click(after);

    expect(screen.getByLabelText('중요 표시')).toBeInTheDocument();
  });
});
