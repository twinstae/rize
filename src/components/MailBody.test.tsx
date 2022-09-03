import { render, screen } from '@testing-library/react';
import React from 'react';

import MailBody from './MailBody';

function renderWithDependency(component: React.ReactElement) {
  return render(component);
}

const TEST_PATH = '';

describe('MailBody', () => {
  it('MailBody는 메일 본문과 이미지를 분리해서 렌더링한다', () => {
    renderWithDependency(
      <MailBody
        mailBody={{
          body: '첫 번째 {이미지} 두 번째',
          images: [TEST_PATH],
        }}
      />
    );

    screen.getByText('첫 번째');
    expect(screen.getByRole('img')).toBeInTheDocument();
    screen.getByText('두 번째');
  });
});
