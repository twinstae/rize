import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';

import fakeStorageRepo from '../config/fakeStorageRepo';
import { DependenciesWrapper } from '../hooks/Dependencies';
import { MockImage } from './Image';
import MailBody from './MailBody';

function renderWithDependency(component: React.ReactElement) {
  return render(component, {
    wrapper: DependenciesWrapper({
      storageRepo: fakeStorageRepo,
      Image: MockImage,
    }),
  });
}

const TEST_PATH = 'img/mail/7/20210428/2e8279a2b7bb39309a585d8282aa81b5.jpeg';

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
    // MockImage는 앞에 image:를 붙여줌
    screen.getByText(TEST_PATH);
    screen.getByText('두 번째');
  });
});
