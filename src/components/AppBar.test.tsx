import React from 'react';
import { render } from './testUtil';

import AppBar from './AppBar';
import { fireEvent } from '@testing-library/react';
import { ko } from '../i18n/i18n';

describe('AppBar', () => {
	it('조합 중인 한글이 두 번 입력되지 않는다.', async () => {
		const { user, screen } = await render(<AppBar />);

		await user.keyboard('/');

		const searchInput = screen.getByRole('textbox', { name: ko.검색 });
		fireEvent.compositionStart(searchInput);
		// 한글 입력을 할 수 있다. 물론 두 번도 된다.
		await user.type(searchInput, '아이즈원ありがとう마라탱탱{Backspace}{Backspace}탕');
		expect(searchInput).toHaveValue('아이즈원ありがとう마라탕');

		fireEvent.compositionEnd(searchInput);
		
		// 하지만 컴포지션이 끝나고 마라탕탕으로 바꾸면
		fireEvent.change(searchInput, { currentTarget: { value: '아이즈원ありがとう마라탕탕' } });

		// 바뀌지 않는다
		expect(searchInput).toHaveValue('아이즈원ありがとう마라탕');

		// 지울 수는 있다
		await user.type(searchInput, '{Backspace}'.repeat(8));
		
		expect(searchInput).toHaveValue('아이즈원');

		// 버튼으로도 지워진다
		await user.click(screen.getByRole('button', {name:'검색창 지우기'}));
		expect(searchInput).toHaveValue('');

		// 영어나 숫자 이모지도 입력할 수 있다.
		await user.type(searchInput, 'iz*one all with you ❤️❤️ 1111 / !{Escape}');
		expect(searchInput).toHaveValue('iz*one all with you ❤️❤️ 1111 / !');
		
		await user.click(screen.getByLabelText(new RegExp(ko.검색)));
		await user.click(screen.getByLabelText(ko.검색창_닫기));
	});
});
