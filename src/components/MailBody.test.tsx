import React from 'react';
import { runSiheom, assertions, given, query } from '../test/siheom';
import MailBody from './MailBody';
import ErrorBoundary from './ErrorBoundary';

const TEST_PATH = 'test.jpg';

describe('MailBody', () => {
	it('MailBody는 메일 본문과 이미지를 분리해서 렌더링한다', async () => {
		await runSiheom(
			given.render(
				<MailBody
					mailBody={{
						body: '첫 번째 {이미지} 두 번째',
						images: [TEST_PATH],
					}}
				/>,
			),
			assertions.visible(query.img(TEST_PATH), true),
		);
	});

	it('이미지가 없으면 에러가 난다', async () => {
		await runSiheom(
			given.render(
				<ErrorBoundary
					fallback={({ error }) => (
						<div role="alert" aria-label={error.message}>
							{error.message}
						</div>
					)}
				>
					<MailBody
						mailBody={{
							body: '첫 번째 {이미지} 두 번째 {이미지} ',
							images: [''],
						}}
					/>
				</ErrorBoundary>,
			),
			assertions.visible(query.alert(/Invariant failed/), true),
		);
	});
});
