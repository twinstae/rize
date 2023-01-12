import React from 'react';

import TagList from './TagList';
import { FAVORITE } from '../mailList/useMailList';
import { render } from './testUtil';

describe('TagList', () => {
  it('FAVORITE 태그는 렌더링되지 않는다', async () => {
    const { screen } = await render(<TagList mailId="m21828" />);

    expect(await screen.findByText('놀이동산')).toBeInTheDocument();
    expect(screen.queryByText(FAVORITE)).not.toBeInTheDocument();
  });
});
