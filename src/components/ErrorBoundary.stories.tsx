import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

function Villain() {
	const [isError, setIsError] = useState(false);
	if (isError) {
		throw Error('test error');
	}
	return (
		<button
			type="button"
			onClick={() => {
				setIsError(true);
			}}
		>
			Trigger error
		</button>
	);
}

const meta = {
	title: 'Components/ErrorBoundary',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<ErrorBoundary fallback={({ error }) => <div role="alert">{error.message}</div>}>
			<Villain />
		</ErrorBoundary>
	),
};
