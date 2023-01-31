import React from 'react';
import { render } from './testUtil';
import { YURI_MAIL_M25752 } from '../test/fixtures';

import paths, { toMailDetail } from '../router/paths';
import MailListItem from './MailListItem';
import linkTest from 'src/router/linkTest';

describe('MailListItem', () => {
	it('MailListItem에는 제목, 별명, 미리보기, 시간이 있다', async () => {
		const { screen } = await render(<MailListItem mail={YURI_MAIL_M25752} index={1} />);

		screen.getByText(YURI_MAIL_M25752.subject);
		screen.getByText(YURI_MAIL_M25752.member);
		screen.getByText(/오늘은 평소 보내던 메일과는 조금 다른 메일/i);
		screen.getByText('21/04/28');
		await screen.findByText('율리스트'); // tag_to_mail_dict "율리스트":["m25752"]
	});

	linkTest(<MailListItem mail={YURI_MAIL_M25752} index={1} />, {
		name: new RegExp(YURI_MAIL_M25752.subject),
		given: paths.ROOT,
		expected: toMailDetail(YURI_MAIL_M25752.id),
		key: '{Enter}'
	});
});
