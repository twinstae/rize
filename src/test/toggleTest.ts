import type { ByRoleMatcher } from '@testing-library/dom';
import type { Screen } from '@testing-library/dom/types/screen';
import React from 'react';
import { render } from '../components/testUtil';

function toggleTest(
	element: React.ReactElement,
	{ setup, role, offOnNames: [offName, onName], key, expectOff, expectOn, teardown }: {
		setup?: () => Promise<void>,
		role: ByRoleMatcher,
		offOnNames: Array<| RegExp
		| string
		| ((accessibleName: string, element: Element) => boolean)>,
		key: string,
		expectOff?: (props: { screen: Screen }) => Promise<void>,
		expectOn?: (props: { screen: Screen }) => Promise<void>,
		teardown?: () => Promise<void>,
	},
) {

	test(`${offName} ${role}을 클릭하면 ${onName}이 되고, ${key} key를 누르면 돌아온다`, async () => {
		setup && await setup();
		const { user, screen } = await render(element);

		expectOff && await expectOff({ screen });
		// offName을 클릭하면
		// tip: off 상태일 때 role과 accessible name이 잘 설정되어 있는지 확인합니다.
		await user.click(screen.getByRole(role, { name: offName }));

		expectOn && await expectOn({ screen });
		// 클릭하면 onName으로 변한다
		// tip: name이 변하지 않는다면, click handler와 name을 확인합니다.
		expect(screen.getByRole(role, { name: onName })).toBeInTheDocument();
		
		// key를 누르면
		await user.keyboard(key);

		expectOff && await expectOff({ screen });
		// tip: name이 변하지 않는다면, keyboard로 접근 가능한지 확인합니다.
		expect(screen.getByRole(role, { name: offName })).toBeInTheDocument();

		teardown && await teardown();
	});
}

export default toggleTest;