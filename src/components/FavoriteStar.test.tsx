import React from 'react';

import FavoriteStar from './FavoriteStar';
import { render } from './testUtil';

describe('FavoriteStar', () => {
  it('중요 표시 버튼을 누르면 중요 표시가 된다', async () => {
    const { user, screen } = await render(<FavoriteStar mailId="m25731"/>);

    const before = await screen.findByLabelText('중요 표시');
    await user.click(before);

    const after = await screen.findByLabelText('중요 취소');
    await user.click(after);

    expect(screen.getByLabelText('중요 표시')).toBeInTheDocument();
  });
});
