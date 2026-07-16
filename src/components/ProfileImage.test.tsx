import React from 'react';
import ProfileImage from './ProfileImage';
import { runSiheom, assertions, given, query } from '../test/siheom';

describe('ProfileImage', () => {
	it('base size', async () => {
		await runSiheom(
			given.render(<ProfileImage member="권은비" size="base" theme="la-vie-en-rose" />),
			assertions.visible(query.img(/권은비/), true),
		);
	});

	it('md size', async () => {
		await runSiheom(
			given.render(<ProfileImage member="운영팀" size="md" theme="la-vie-en-rose" />),
			assertions.visible(query.img('운영팀'), true),
		);
	});

	it('sm size', async () => {
		await runSiheom(
			given.render(<ProfileImage member="" size="base" theme="la-vie-en-rose" />),
			assertions.visible(query.img(/izone-logo/), true),
		);
	});
});
