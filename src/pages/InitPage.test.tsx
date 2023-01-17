import React, { Suspense } from 'react';

import { updateFakeStatus } from '../mailList/fakeMailRepository';
import TEST_MAIL_LIST from '../public/pm_list.json';
import InitPage from './InitPage';
import { render } from '../components/testUtil';
import { useMailList } from '../hooks/Dependencies';


function Wait(){
  useMailList().waitForAll();
  return <span>렌더!</span>;
}

function Story(){
  return (
    <Suspense fallback={<InitPage />}>
      <Wait />
    </Suspense>
  );
}

describe('InitPage', () => {
  it('이미 파일이 업로드 되어 있으면, 렌더가 된다', async () => {
    const { screen } = await render(<Story />);

    expect(await screen.findByText('렌더!')).toBeInTheDocument();
  });

  it('필요한 파일을 업로드하면 메일 목록 페이지로 넘어간다', async () => {
    updateFakeStatus({ 'pm_list.json': false });
    
    const { user, screen } = await render(<Story />);

    const uploadButton = screen.getByRole('button', {
      name: 'upload'
    });
    await user.click(uploadButton);

    expect(screen.queryByText('렌더!')).not.toBeInTheDocument();

    const file = new File([JSON.stringify(TEST_MAIL_LIST.slice(0,2), null, 2)], 'pm_list.json', {type: 'application/json'});
    file.text = async () => JSON.stringify(TEST_MAIL_LIST.slice(0,2), null, 2);

    const input = screen.getByLabelText(/pm_list.json/i) as HTMLInputElement;
    await user.upload(input, file);
    expect(input.files).toHaveLength(1);
    await user.click(uploadButton);
    expect(await screen.findByText('렌더!')).toBeInTheDocument();
  });
});
