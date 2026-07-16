import React from 'react';
import { runSiheom, given, actions, assertions, query } from '../test/siheom';
import { YURI_MAIL_M25752 } from '../test/fixtures';

import paths, { toMailDetail } from '../router/paths';
import MailListItem from './MailListItem';
import linkTest from 'src/router/linkTest';

describe('MailListItem', () => {
	it('MailListItem에는 제목, 별명, 미리보기, 시간이 있다', async () => {
		await runSiheom(
			given.render(<MailListItem mail={YURI_MAIL_M25752} index={1} />),
			assertions.visible(query.heading(YURI_MAIL_M25752.subject), true),
			assertions.visible(query.img(YURI_MAIL_M25752.member), true),
		);
	});

	linkTest(<MailListItem mail={YURI_MAIL_M25752} index={1} />, {
		name: new RegExp(YURI_MAIL_M25752.subject),
		given: paths.ROOT,
		expected: toMailDetail(YURI_MAIL_M25752.id),
		key: '{Enter}',
	});
});
