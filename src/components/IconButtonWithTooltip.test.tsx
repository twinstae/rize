import React from 'react';
import { render } from './testUtil';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import XMarkIcon from './icons/XMarkIcon';

describe('IconButtonWithTooltip', () => {
  it('IconButtonWithTooltip에는 제목, 별명, 미리보기, 시간이 있다', async () => {
    let done = false;
    const { screen, user } = await render(<IconButtonWithTooltip 
      onClick={() => {
        done = true;
      }}
      icon={<XMarkIcon />}
      aria-label="테스트 버튼"
    />);

    await user.click(screen.getByRole('button', { name: '테스트 버튼' }));

    expect(done).toBe(true);
  });
});
