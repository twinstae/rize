import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { profileList } from '../../config/useProfile';
import ProfileConfig from './ProfileConfig';

describe('ProfileConfig', () => {
  it('ProfileConfig 원하는 프로필을 선택하면 프로필이 바뀐다', async () => {
    render(<ProfileConfig />);

    expect(screen.getAllByRole('img')).toHaveLength(12 + 4 * profileList.length);

    await userEvent.click(screen.getByRole('radio', { name: 'violeta' }));

    screen.getByText('선택한 테마 : violeta');
  });
});
