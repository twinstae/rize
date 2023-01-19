import React, { Suspense } from 'react';

import { updateFakeStatus } from '../mailList/fakeMailRepository';
import TEST_MAIL_LIST from '../public/pm_list.json';
import InitPage from './InitPage';
import { render } from '../components/testUtil';
import { useMailList } from '../hooks/Dependencies';
import { _alertLogs } from '@rize/alert';

function Wait() {
	useMailList().waitForAll();
	return <span>렌더!</span>;
}

function Story() {
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

	const VALID_JSON = JSON.stringify(TEST_MAIL_LIST.slice(0, 2), null, 2);

	function JSONFile(data: string, name: string) {
		const file = new File([data], name, {
			type: 'application/json',
		});
		file.text = async () => data;
		return file;
	}
	it('필요한 파일을 업로드하면 메일 목록 페이지로 넘어간다', async () => {
		updateFakeStatus({ 'pm_list.json': false });

		const { user, screen } = await render(<Story />);

		const uploadButton = screen.getByRole('button', {
			name: 'upload',
		});
		await user.click(uploadButton);

		expect(screen.queryByText('렌더!')).not.toBeInTheDocument();

		const file = JSONFile(VALID_JSON, 'pm_list.json');

		const input = screen.getByLabelText(/pm_list.json/i) as HTMLInputElement;
		await user.upload(input, file);
		expect(input.files).toHaveLength(1);
		await user.click(uploadButton);
		expect(await screen.findByText('렌더!')).toBeInTheDocument();
	});

	it('형식이 잘못되면 에러가 발생한다', async () => {
		updateFakeStatus({ 'pm_list.json': false });
		const { user, screen } = await render(<Story />);

		const input = screen.getByLabelText(/pm_list.json/i) as HTMLInputElement;
		await user.upload(input, JSONFile(VALID_JSON, 'pm_lis.json'));
		expect(_alertLogs).toHaveLength(1);
		expect(_alertLogs[0]).toMatch('파일 명이 다릅니다');
		expect(input.files).toHaveLength(0);

		const INVALID_JSON = VALID_JSON.slice(1);
		await user.upload(input, JSONFile(INVALID_JSON, 'pm_list.json'));
		expect(_alertLogs).toHaveLength(2);
		expect(_alertLogs[1]).toMatch('JSON 파일이 깨져서 읽을 수 없습니다.');
		expect(input.files).toHaveLength(0);

		await user.upload(input, JSONFile(JSON.stringify([{ id: 'm1234' }]), 'pm_list.json'));
		expect(_alertLogs).toHaveLength(3);
		expect(_alertLogs[2]).toMatch('0 -> member 에서 invalid_type Required');
		expect(input.files).toHaveLength(0);
	});
});
