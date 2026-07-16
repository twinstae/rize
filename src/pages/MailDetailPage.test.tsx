import React from 'react';

import { useFakeNavigation } from '../router/useFakeNavigation';
import MailDetailPage from './MailDetailPage';
import { runSiheom, given, actions, assertions, query } from '../test/siheom';
import { toMailDetail } from '../router/paths';
import { ko } from '../i18n/i18n';

describe('MailDetailPage', () => {
	it('MailDetailPage 제목, 별명, 미리보기, 시간이 있다', async () => {
		const navigation = useFakeNavigation();
		navigation.clear();
		navigation.navigate(toMailDetail('m25669'));

		await runSiheom(given.render(<MailDetailPage />), assertions.visible(query.label(ko.돌아가기), true));
	});

	it('다음 메일이 있으면 다음 메일보기를 눌러서 다음 메일로 replace할 수 있다', async () => {
		const { navigate, useSearchParams } = useFakeNavigation();
		navigate(toMailDetail('m25700'));

		await runSiheom(given.render(<MailDetailPage />), actions.click(query.link('다음 메일 보기')));

		const [searchParams] = useSearchParams();
		const NEXT_ID = 'm25672';
		expect(searchParams.get('mailId')).toBe(NEXT_ID);
	});
});
