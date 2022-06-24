import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import useTag from '../mailList/useTag';
import SelectedTag from './SelectedTag';

describe('SelectedTag', () => {
  const Story = ({ tag }: { tag: string }) => {

    const [, selectTag] = useTag();
    return <><button onClick={() => selectTag(() => tag)}>선택</button> <SelectedTag /></>;
  };

  it('선택된 태그가 없으면 렌더링이 되지 않는다', async () => {
    render(<Story tag=""/>);
    fireEvent.click(screen.getByText('선택'));

    expect(screen.queryByTestId('selected-tag')).not.toBeInTheDocument();
  });
  it('일반 태그는 프로필이 없다', async () => {
    render(<Story tag="놀이동산"/>);
    fireEvent.click(screen.getByText('선택'));

    expect(await screen.findByText('놀이동산')).toBeInTheDocument();
  });

  it('멤버 태그는 프로필이 있다', async () => {
    render(<Story tag="권은비"/>);
    fireEvent.click(screen.getByText('선택'));

    expect(await screen.findByAltText(/권은비.jpg/)).toBeInTheDocument();
    expect(await screen.findByText('권은비')).toBeInTheDocument();
  });
});
