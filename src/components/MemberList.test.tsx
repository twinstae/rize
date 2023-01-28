import React from 'react';

import { MEMBER_LIST } from '../constants';
import MemberList from './MemberList';
import SelectedTag from './SelectedTag';
import { render } from './testUtil';

describe('MemberList x SelectedTag', () => {
	it('멤버를 클릭하면, 그 멤버의 태그가 선택된다', async () => {
		const name = MEMBER_LIST[0];
		const Story = () => {
			return (
				<div>
					<SelectedTag />
					<MemberList />
				</div>
			);
		};

		const { user, screen } = await render(<Story />);
		const theMember = screen.getByText(name);
		expect(theMember).not.toBeSelected();

		await user.click(theMember);

		expect(screen.getByTestId('selected-tag')).toHaveTextContent(name);
		expect(theMember).toBeSelected();
	});
});
