import React from 'react';

import { useMailList } from '../hooks/Dependencies';
import { runSiheom, given, assertions, query } from '../test/siheom';

function Story() {
	useMailList().waitForAll();
	return <span>렌더!</span>;
}

describe('InitPage', () => {
	it('이미 파일이 업로드 되어 있으면, 렌더가 된다', async () => {
		await runSiheom(given.render(<Story />), assertions.visible(query.text('렌더!'), true));
	});
});
