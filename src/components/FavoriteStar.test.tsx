import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { DependenciesWrapper } from '../hooks/Dependencies';
import fakeMailRepository from '../mailList/fakeMailRepository';
import useMailList, { createUseMailList } from '../mailList/useMailList';
import FavoriteStar from './FavoriteStar';


function Story() {
  const { mailById } = useMailList();
  const mail = mailById('m25731');
  if (mail === undefined) return null;
  return (
    <FavoriteStar mail={mail}/>
  );
}

describe('FavoriteStar', () => {
  it('중요 표시하기 버튼을 누르면 중요 표시가 된다', async () => {
    render(<Story />, {
      wrapper: DependenciesWrapper({ useMailList: createUseMailList(fakeMailRepository) }),
    });

    fireEvent.click(await screen.findByLabelText('중요 표시하기'));
    fireEvent.click(await screen.findByLabelText('중요'));
    expect(screen.getByLabelText('중요 표시하기')).toBeInTheDocument();
  });
});
