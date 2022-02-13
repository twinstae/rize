import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const QueryWrapper: WrapperT = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
export const TestQueryWrapper: WrapperT = ({ children }) => (
  <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
);

export default QueryWrapper;
