import React, { useState } from 'react';
import { render } from './testUtil';
import ErrorBoundary from './ErrorBoundary';

function Vilan() {
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
		const { user, screen } = await render(
			<ErrorBoundary fallback={({ error }) => <span>{error.message}</span>}>
				<Vilan />
			</ErrorBoundary>,
		);

		await user.click(screen.getByRole('button', { name: 'hehe' }));
		await screen.findByText('test error');
	});
});
