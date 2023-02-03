import React, { useState } from 'react';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { render } from './testUtil';
import { FormLabel, TextInput, Text } from './rize-ui-web';

describe('TextInput', () => {
	function Story(){
		const [state, setState] = useState('');
		return (
			<FormLabel>
				<Text>테스트</Text>
				<TextInput
					type="search"
					name="search"
					size="sm"
					width="full"
					autofocus
					value={state}
					onChange={(e) => {
						setState(e.currentTarget.value);
					}}
				/>
			</FormLabel>
		);
	}
	it('한글 입력 엣지 케이스 테스트', async () => {
		const { user, screen } = await render(<Story />);
		
		const $input = screen.getByRole('searchbox', { name: '테스트' });
		fireEvent.compositionStart($input);
		// 한글 입력을 할 수 있다. 물론 두 번도 된다.
		await user.type($input, '아이즈원ありがとう마라탱탱{Backspace}{Backspace}탕');
		expect($input).toHaveValue('아이즈원ありがとう마라탕');

		fireEvent.compositionEnd($input);
		
		// 하지만 컴포지션이 끝나고 마라탕탕으로 바꾸면
		fireEvent.change($input, { currentTarget: { value: '아이즈원ありがとう마라탕탕' } });

		// 바뀌지 않는다
		expect($input).toHaveValue('아이즈원ありがとう마라탕');

		// 지울 수는 있다
		await user.type($input, '{Backspace}'.repeat(8));
		
		expect($input).toHaveValue('아이즈원');
		
		// 중간에 공백을 넣는 건 가능하다.
		act(() => {
			fireEvent.change($input, { target: { value: '아이즈 원' } });
		});

		expect($input).toHaveValue('아이즈 원');

		await user.clear($input);
		expect($input).toHaveValue('');

		// 영어나 숫자 이모지도 입력할 수 있다.
		await user.type($input, 'iz*one all with you ❤️❤️ 1111 / !');
		expect($input).toHaveValue('iz*one all with you ❤️❤️ 1111 / !');
	});
});