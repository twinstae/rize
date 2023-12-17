import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createWrapper } from './util';
import { Provider } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';
import { PropsWithChildren } from 'react';
import { useHydrateAtoms } from 'jotai/utils';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchInterval: false,
			staleTime: 1000 * 60 * 60,
		},
	},
});

const QueryWrapper = createWrapper(QueryClientProvider, {
	client: queryClient,
});

export const JotaiQueryWrapper = ({ children }: PropsWithChildren) => {
	useHydrateAtoms([[queryClientAtom, queryClient]])
	return children
  }

const testQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export const TestQueryWrapper = createWrapper(QueryClientProvider, {
	client: testQueryClient,
});

export default QueryWrapper;
