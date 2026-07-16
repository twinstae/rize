import React, { PropsWithChildren, Suspense, type ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { queryClientAtom } from 'jotai-tanstack-query';
import { act, cleanup, render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import {
	defaultActions,
	defaultAssertions,
	overrideSiheom,
	type Locator,
} from '@siheom/core';
import { DependenciesContext, createFakeDependencies } from '../hooks/Dependencies';

const ASSERTION_TIMEOUT = 5000;

function HydrateAtoms({
	initialValues,
	children,
}: PropsWithChildren<{ initialValues: [typeof queryClientAtom, QueryClient][] }>) {
	useHydrateAtoms(initialValues);
	return children;
}

async function waitForSuspenseToSettle() {
	await waitFor(
		async () => {
			if (screen.queryByText('loading...')) {
				await waitFor(
					() => {
						expect(screen.queryByText('loading...')).not.toBeInTheDocument();
					},
					{ timeout: ASSERTION_TIMEOUT },
				);
			}
			await new Promise((resolve) => requestAnimationFrame(resolve));
			expect(screen.queryByText('loading...')).not.toBeInTheDocument();
		},
		{ timeout: ASSERTION_TIMEOUT },
	);
}

const renderGiven = async (element: ReactElement) => {
	const fakeDependencies = createFakeDependencies();
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});

	function Providers({ children }: PropsWithChildren) {
		return (
			<QueryClientProvider client={queryClient}>
				<Provider>
					<HydrateAtoms initialValues={[[queryClientAtom, queryClient]]}>
						<Suspense fallback={<div>loading...</div>}>
							<DependenciesContext.Provider value={fakeDependencies}>{children}</DependenciesContext.Provider>
						</Suspense>
					</HydrateAtoms>
				</Provider>
			</QueryClientProvider>
		);
	}

	await act(async () => {
		cleanup();
		render(<Providers>{element}</Providers>);
		fakeDependencies.usePlatform();
	});
	await waitForSuspenseToSettle();
};

function getLocatorElement(target: Locator, expected: boolean) {
	if (target.role === 'text') {
		return screen.queryByText(target.name as string | RegExp);
	}
	if (target.role === 'label') {
		return expected
			? screen.getByLabelText(target.name as string | RegExp)
			: screen.queryByLabelText(target.name as string | RegExp);
	}
	return expected
		? screen.getByRole(target.role, { name: target.name })
		: screen.queryByRole(target.role, { name: target.name });
}

const { runSiheom, actions, assertions, given, query } = overrideSiheom(
	{
		actions: {
			...defaultActions,
			click: async (target: Locator) => {
				await userEvent.click(getLocatorElement(target, true)!);
			},
			keyboard: async (target: Locator, key: string) => {
				if (key.length === 1 || key === '/') {
					document.body.focus();
				} else if (target.role === 'label') {
					getLocatorElement(target, true)?.focus();
				} else {
					screen.getByRole(target.role, { name: target.name }).focus();
				}
				await userEvent.keyboard(key);
			},
			select: async (target: Locator, value: string) => {
				await waitFor(async () => {
					const element = screen.getByRole(target.role, { name: target.name });
					expect(element).toBeInTheDocument();
					await userEvent.selectOptions(element, value);
				});
			},
		},
		assertions: defaultAssertions,
		givens: {
			render: renderGiven,
		},
	},
	{
		assertions: {
			visible: async (target: Locator, expected: boolean) => {
				await waitFor(
					async () => {
						if (target.role === 'text' || target.role === 'label') {
							const element = getLocatorElement(target, expected);
							if (expected) {
								expect(element).toBeInTheDocument();
							} else {
								expect(element).not.toBeInTheDocument();
							}
							return;
						}

						const element = getLocatorElement(target, expected);

						if (expected) {
							expect(element).toBeInTheDocument();
							expect(element).not.toHaveAttribute('aria-hidden', 'true');
							return;
						}

						if (element === null) {
							expect(element).not.toBeInTheDocument();
							return;
						}

						expect(element).not.toHaveAttribute('aria-hidden', 'false');
					},
					{ timeout: ASSERTION_TIMEOUT },
				);
			},
			checked: async (target: Locator, expected: boolean) => {
				await waitFor(
					async () => {
						const element = screen.getByRole(target.role, { name: target.name });
						expect(element).toBeInTheDocument();

						if (element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type)) {
							if (expected) {
								expect(element).toBeChecked();
							} else {
								expect(element).not.toBeChecked();
							}
							return;
						}

						if (expected) {
							expect(element).toHaveAttribute('aria-checked', 'true');
						} else {
							expect(element).not.toHaveAttribute('aria-checked', 'true');
						}
					},
					{ timeout: ASSERTION_TIMEOUT },
				);
			},
		},
	},
);

export { runSiheom, actions, assertions, given, query };
