import React, { useState } from 'react';
import { runSiheom, actions, assertions, given, query } from '../test/siheom';
import ErrorBoundary from './ErrorBoundary';

function Villain() {
	const [isError, setIsError] = useState(false);
	if (isError) {
		throw Error('test error');
	}
	return (
		<button
			onClick={() => {
				setIsError(true);
			}}
		>
			hehe
		</button>
	);
}

describe('ErrorBoundary', () => {
	it('error가 발생하면 fallback을 보여준다', async () => {
		await runSiheom(
			given.render(
				<ErrorBoundary fallback={({ error }) => <div role="alert" aria-label={error.message}>{error.message}</div>}>
					<Villain />
				</ErrorBoundary>,
			),
			actions.click(query.button('hehe')),
			assertions.visible(query.alert('test error'), true),
		);
	});
});
