/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Queries,
  render as originalRender,
  RenderOptions,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/setup/setup';
import React, { Suspense } from 'react';
import { Dependencies, createFakeDependencies } from '../hooks/Dependencies';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClientAtom } from 'jotai-tanstack-query';
import { Provider } from 'jotai';



export function render<
  Q extends Queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  ui: React.ReactElement,
  options: RenderOptions<Q, Container, BaseElement>,
): Promise<RenderResult<Q, Container, BaseElement> & { screen: typeof screen, user: UserEvent }>;
export function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
): Promise<RenderResult & { screen: typeof screen, user: UserEvent }>;
export async function render(
  ui: any,
  options?: any,
): Promise<any> {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });
  const result = originalRender(
    <QueryClientProvider client={queryClient}>
      <Provider initialValues={[[queryClientAtom, queryClient]]}>
        <Suspense fallback={<div>loading...</div>}>
          <Dependencies.Provider value={createFakeDependencies()}>
            {ui}
          </Dependencies.Provider>
        </Suspense>
      </Provider>
    </QueryClientProvider>,
    options,
  );
  const user = userEvent.setup();
  await waitFor(() => {
    expect(screen.queryByText('loading...')).toBe(null);
  });
  return {
    screen,
    ...result,
    user
  };
}