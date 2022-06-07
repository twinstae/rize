import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';

import fakeStorageRepo from '../config/fakeStorageRepo';
import { DependenciesWrapper } from '../hooks/Dependencies';
import fakeMailRepository from '../mailList/fakeMailRepository';
import { createUseMailList } from '../mailList/useMailList';
import { toMailDetail } from '../router/paths';
import { useFakeNavigation } from '../router/useNavigation';
import { TEST_MAIL } from '../test/fixtures';
import MailListItem from './MailListItem';
import { MockImage } from './MockImage';

function renderWithDependency(component: React.ReactElement) {
  const useMailList = createUseMailList(fakeMailRepository);
  const navigation = useFakeNavigation();

  const result = render(component, {
    wrapper: DependenciesWrapper({
      useNavigationImpl: () => navigation,
      Image: MockImage,
      storageRepo: fakeStorageRepo,
      useMailList,
    }),
  });

  return { ...result, navigation };
}

describe('MailListItem', () => {
  it('MailListItem에는 제목, 별명, 미리보기, 시간이 있다', () => {
    renderWithDependency(<MailListItem mail={TEST_MAIL} style={{}} />);

    screen.getByText(TEST_MAIL.subject);
    screen.getByText('조유리');
    screen.getByText(TEST_MAIL.preview);
    screen.getByText(TEST_MAIL.time);
  });

  it('MailListItem을 클릭하면 id 에 해당하는 메일 상세 페이지로 이동한다', () => {
    const { navigation } = renderWithDependency(
      <MailListItem mail={TEST_MAIL} style={{}} />
    );

    fireEvent.click(screen.getByText(TEST_MAIL.subject));

    expect(navigation.current()).toBe(toMailDetail(TEST_MAIL.id));
  });
});
