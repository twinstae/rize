import React, { PropsWithChildren, Suspense, type ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { queryClientAtom } from 'jotai-tanstack-query';
import { act, render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import {
	defaultActions,
	defaultAssertions,
	extendSiheom,
	type Locator,
} from '@siheom/core';
import { DependenciesContext, createFakeDependencies } from '../hooks/Dependencies';

function HydrateAtoms({
	initialValues,
	children,
}: PropsWithChildren<{ initialValues: [typeof queryClientAtom, QueryClient][] }>) {
	useHydrateAtoms(initialValues);
	return children;
}

const { runSiheom, actions, assertions, given, query } = extendSiheom(
	{
		actions: defaultActions,
		assertions: defaultAssertions,
		givens: {
			render: async (element: ReactElement) => {
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
					render(<Providers>{element}</Providers>);
					fakeDependencies.usePlatform();
				});
				await act(async () => {
					await Promise.resolve();
				});
				await waitFor(
					() => {
						expect(screen.queryByText('loading...')).not.toBeInTheDocument();
					},
					{ timeout: 5000 },
				);
			},
		},
	},
	{
		actions: {
			keyboard: async (_target: Locator, key: string) => {
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
	},
);

export { runSiheom, actions, assertions, given, query };
