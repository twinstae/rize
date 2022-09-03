import { render, screen } from '@testing-library/react';
import React from 'react';

import { FAVORITE, UNREAD } from '../mailList/useMailList';
import TagList from './TagList';

describe('TagList', () => {
  it('FAVORITE 태그는 렌더링되지 않는다', async () => {
    render(<TagList mailId="m21828" />);

    expect(await screen.findByText('놀이동산')).toBeInTheDocument();
    expect(await screen.findByText(UNREAD)).toBeInTheDocument();
    expect(screen.queryByText(FAVORITE)).not.toBeInTheDocument();
  });
});
