import React from 'react';

import { MEMBER_LIST } from '../constants';
import MemberList from './MemberList';
import radioTest from '../test/radioTest';
import SelectedTag from './SelectedTag';

describe('MemberList x SelectedTag', () => {
	radioTest(
		<div>
			<SelectedTag />
			<MemberList />
		</div>,
		{
			names: ['전체'].concat(MEMBER_LIST),
			init: '전체',
			expectChecked: async ({ name }) => {
				const selectedTag = document.querySelector('[data-testid="selected-tag"]');
				expect(selectedTag?.textContent).toContain(name as string);
			},
		},
	);
});
