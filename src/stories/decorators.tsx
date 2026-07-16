import React, { PropsWithChildren, Suspense, useLayoutEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { queryClientAtom } from 'jotai-tanstack-query';
import { DependenciesContext, createFakeDependencies } from '../hooks/Dependencies';
import { useFakeNavigation } from '../router/useFakeNavigation';

function HydrateAtoms({
	initialValues,
	children,
}: PropsWithChildren<{ initialValues: [typeof queryClientAtom, QueryClient][] }>) {
	useHydrateAtoms(initialValues);
	return children;
}

function RizeProviders({ children }: PropsWithChildren) {
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: { queries: { retry: false } },
			}),
		[],
	);
	const fakeDependencies = useMemo(() => createFakeDependencies(), []);

	useLayoutEffect(() => {
		fakeDependencies.usePlatform();
	}, [fakeDependencies]);

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

function ResetNavigation({ children }: PropsWithChildren) {
	const navigation = useFakeNavigation();

	useLayoutEffect(() => {
		navigation.clear();
	}, [navigation]);

	return children;
}

export const withRizeProviders = (Story: React.FC) => (
	<RizeProviders>
		<ResetNavigation>
			<Story />
		</ResetNavigation>
	</RizeProviders>
);
