import React from 'react';
import MailBody from './MailBody';
import { render } from './testUtil';
import ErrorBoundary from './ErrorBoundary';

const TEST_PATH = 'test.jpg';

describe('MailBody', () => {
  it('MailBody는 메일 본문과 이미지를 분리해서 렌더링한다', async () => {
    const { screen } = await render(
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
  it('이미지가 없으면 에러가 난다', async () => {
    const { screen } = await render(
      <ErrorBoundary fallback={() => <span>에러!</span>}>
        <MailBody
          mailBody={{
            body: '첫 번째 {이미지} 두 번째 {이미지} ',
            images: [''],
          }}
        />
      </ErrorBoundary>
    );

    screen.getByText('에러!');
  });
});
