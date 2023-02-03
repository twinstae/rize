import type { ByRoleMatcher } from '@testing-library/dom';
import type { Screen } from '@testing-library/dom/types/screen';
import React from 'react';
import { render } from '../components/testUtil';
import type { Matcher } from '../global';

function toggleTest(
	element: React.ReactElement,
	{ setup, role, closeOpenNames: [closeName, openName], keys: [openKey, closeKey], expectClose, expectOpen, teardown }: {
		setup?: () => Promise<void>,
		role: ByRoleMatcher,
		closeOpenNames: [Matcher, Matcher],
		keys: [string, string],
		expectClose?: (props: { screen: Screen }) => Promise<void>,
		expectOpen?: (props: { screen: Screen }) => Promise<void>,
		teardown?: () => Promise<void>,
	},
) {

	test(`${closeName}을 클릭하면 열리고, ${closeKey}을 누르면 닫히고, ${openKey}을 누르면 열리고 ${openName}을 클릭하면 닫힌다`, async () => {
		setup && await setup();
		const { user, screen } = await render(element);

		expectClose && await expectClose({ screen });
		// closeName을 클릭하면
		// tip: off 상태일 때 role과 accessible name이 잘 설정되어 있는지 확인합니다.
		await user.click(screen.getByRole(role, { name: closeName }));

		// 클릭하면 openName으로 변한다
		// tip: name이 변하지 않는다면, click handler와 name을 확인합니다.
		expect(screen.getByRole(role, { name: openName })).toBeInTheDocument();
		expectOpen && await expectOpen({ screen });
		
		// closeKey를 누르면
		await user.keyboard(closeKey);

		// tip: name이 변하지 않는다면, keyboard로 접근 가능한지 확인합니다.
		expect(screen.getByRole(role, { name: closeName })).toBeInTheDocument();
		expectClose && await expectClose({ screen });

		// openKey를 누르면
		await user.keyboard(openKey);

		// tip: name이 변하지 않는다면, keyboard로 접근 가능한지 확인합니다.
		expect(screen.getByRole(role, { name: openName })).toBeInTheDocument();
		expectOpen && await expectOpen({ screen });
		// closeName을 클릭하면
		// tip: off 상태일 때 role과 accessible name이 잘 설정되어 있는지 확인합니다.
		await user.click(screen.getByRole(role, { name: openName }));

		// 클릭하면 openName으로 변한다
		// tip: name이 변하지 않는다면, click handler와 name을 확인합니다.
		expect(screen.getByRole(role, { name: closeName })).toBeInTheDocument();
		expectClose && await expectClose({ screen });
		
		teardown && await teardown();
	});
}

export default toggleTest;