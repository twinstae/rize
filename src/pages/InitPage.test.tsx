import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { updateFakeStatus } from '../mailList/fakeMailRepository';
import TEST_MAIL_LIST from '../public/pm_list.json';
import paths from '../router/paths';
import { useFakeNavigation } from '../router/useNavigation';
import InitPage from './InitPage';

describe('InitPage', () => {
  it('이미 파일이 업로드 되어 있으면, 애니메이션이 끝나고 메일 목록 페이지로 넘어간다', async () => {
    render(<InitPage />);

    const fakeNavigation = useFakeNavigation();
    expect(fakeNavigation.current()).toBe(paths.ROOT);
    await waitFor(() => {
      expect(fakeNavigation.current()).toBe(paths.MAIL_LIST);
    });
    
    //teardown
    fakeNavigation.goBack();
  });

  it('필요한 파일을 업로드하면 메일 목록 페이지로 넘어간다', async () => {
    updateFakeStatus({ 'pm_list.json': false });
    
    render(<InitPage />);

    const file = new File([JSON.stringify(TEST_MAIL_LIST, null, 2)], 'pm_list.json', {type: 'application/json'});
    file.text = async () => JSON.stringify(TEST_MAIL_LIST, null, 2);

    const input = screen.getByLabelText(/pm_list.json/i);
    await userEvent.upload(input, file);
    
    const uploadButton = screen.getByText(/upload/i);
    await userEvent.click(uploadButton);

    const fakeNavigation = useFakeNavigation();
    await waitFor(() => {
      expect(fakeNavigation.current()).toBe(paths.MAIL_LIST);
    });

    //teardown
    fakeNavigation.goBack();
  });

  it('없는 파일이 있는 채로 upload 버튼을 누르면, 메일 목록 페이지로 넘어가지 않는다', async () => {
    updateFakeStatus({ 'pm_list.json': false });

    const fakeNavigation = useFakeNavigation();    
    fakeNavigation.navigate(paths.ROOT);
    render(<InitPage />);

    const uploadButton = screen.getByText(/upload/i);
    await userEvent.click(uploadButton);

    expect(fakeNavigation.current()).toBe(paths.ROOT);
  });
});
