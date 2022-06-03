import { QueryClient, QueryClientProvider } from 'react-query';

import { createWrapper } from './util';

const queryClient = new QueryClient();
const QueryWrapper = createWrapper(QueryClientProvider, {
  client: queryClient,
});

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
