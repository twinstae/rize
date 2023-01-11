import React from 'react';

import useTag from '../mailList/useTag';
import SelectedTag from './SelectedTag';
import { render } from './testUtil';
import { waitFor } from '@testing-library/react';

describe('SelectedTag', () => {
  const Story = ({ tag }: { tag: string }) => {

    const [, selectTag] = useTag();
    return <><button onClick={() => selectTag(() => tag)}>선택</button> <SelectedTag /></>;
  };

  it('선택된 태그가 없으면 렌더링이 되지 않는다', async () => {
    const { user, screen } = await render(<Story tag=""/>);
    await user.click(screen.getByText('선택'));

    expect(screen.queryByTestId('selected-tag')).not.toBeInTheDocument();
  });
  it('일반 태그는 프로필이 없다', async () => {
    const { user, screen } = await render(<Story tag="놀이동산"/>);
    await user.click(screen.getByText('선택'));

    expect(screen.getByText('놀이동산')).toBeInTheDocument();
  });

  it('멤버 태그는 프로필이 있다', async () => {
    const { user, screen } = await render(<Story tag="권은비"/>);
    await user.click(screen.getByText('선택'));

    await waitFor(() => {
      expect(screen.queryByText('loading...')).toBe(null);
    });
    expect(screen.getByRole('img')).toHaveAttribute('src', 'http://localhost:8000/img/profile/one-the-story/권은비.jpg');
    expect(screen.getByText('권은비')).toBeInTheDocument();
  });
});
