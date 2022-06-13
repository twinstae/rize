import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useDependencies } from '../hooks/Dependencies';
import FavoriteStar from './FavoriteStar';


function Story() {
  const { mailById } = useDependencies().useMailList();
  const mail = mailById('m25731');
  if (mail === undefined) return null;
  return (
    <FavoriteStar mail={mail}/>
  );
}

describe('FavoriteStar', () => {
  it('중요 표시하기 버튼을 누르면 중요 표시가 된다', async () => {
    render(<Story />);

    const before = await screen.findByLabelText('중요 표시하기');
    fireEvent.click(before);

    const after = await screen.findByLabelText('중요');
    fireEvent.click(after);

    expect(screen.getByLabelText('중요 표시하기')).toBeInTheDocument();
  });
});
