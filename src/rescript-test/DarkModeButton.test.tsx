import React from 'react';
import { render } from '../components/testUtil';
import { make as DarkModeButton } from './DarkModeButton.gen';

describe('DarkModeButton', () => {
	it('다크 모드 버튼을 렌더할 수 있다', async () => {
		// 다크 모드 버튼을 document에 렌더해요.
		const { user, screen } = await render(<DarkModeButton />);

		// dom에서 button role을 가지고
		// "현재 다크 모드"라는 접근 가능한 이름(name)을 가진 element를 가져와요.
		// getBy는 요소를 찾지 못하면 에러가 나고 테스트가 실패해요.
		const button = screen.getByRole('button', { name: '현재 다크 모드' });	
		await user.click(button);
		// 이 버튼이 document에 있는지 확인해요. 생략할 수 있어요.
		expect(button).toHaveAccessibleName('현재 라이트 모드');
		await user.click(button);
		expect(button).toHaveAccessibleName('현재 다크 모드');
	});
});