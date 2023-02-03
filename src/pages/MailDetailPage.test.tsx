import React from 'react';

import { useFakeNavigation } from '../router/useFakeNavigation';
import MailDetailPage from './MailDetailPage';
import { render } from '../components/testUtil';
import { toMailDetail } from '../router/paths';
import { ko } from '../i18n/i18n';

describe('MailDetailPage', () => {
	it('MailDetailPage 제목, 별명, 미리보기, 시간이 있다', async () => {
		const { navigate } = useFakeNavigation();
		navigate(toMailDetail('m25669'));
		// {
		//   "id": "m25669",
		//   "member": "장원영",
		//   "subject": "우리 위즈원💛",
		//   "preview": "위즈원!! 그리고 {_nickname_}!! 그동안 정말 정말 고마웠어ㅎㅎ 2년 반이라는 시간동안 {_nickname_}한테 배운것도, 느낀것도, 고마운것도 너무 많아서 {_nic",
		//   "time": "2021-04-28 23:00"
		// }
		// "images": ["img/mail/1/20210428/5e8a460718a30b23fdefe53dab01309f.jpeg"]

		const { screen } = await render(<MailDetailPage />);

		await screen.findAllByLabelText(ko.돌아가기);
		screen.getByLabelText('중요 표시');

		screen.getByText('장원영');

		screen.getByText(/그동안 정말 정말 고마웠어ㅎㅎ/);

		// mail image
		expect(
			screen
				.getAllByRole('img')
				.filter(
					(el) =>
						el instanceof HTMLImageElement &&
						el.src === 'http://localhost:8000/img/mail/1/20210428/5e8a460718a30b23fdefe53dab01309f.jpeg',
				),
		).toHaveLength(1);

		expect(screen.queryByLabelText('다음 메일 보기')).not.toBeInTheDocument();
	});
	it('다음 메일이 있으면 다음 메일보기를 눌러서 다음 메일로 replace할 수 있다', async () => {
		const { navigate, useSearchParams } = useFakeNavigation();
		navigate(toMailDetail('m25700'));

		const { user, screen } = await render(<MailDetailPage />);

		screen.getByText('최예나');
		await user.click(screen.getByRole('link', { name: '다음 메일 보기' }));

		const [searchParams] = useSearchParams();
		const NEXT_ID = 'm25672';
		expect(searchParams.get('mailId')).toBe(NEXT_ID);
	});
});
