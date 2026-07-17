import React from 'react';

import { useFakeNavigation } from '../router/useFakeNavigation';
import MailDetailPage from './MailDetailPage';
import { runSiheom, given, actions, assertions, query } from '../test/siheom';
import { toMailDetail } from '../router/paths';
import paths from '../router/paths';
import { ko } from '../i18n/i18n';
import { act, cleanup, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { queryClientAtom } from 'jotai-tanstack-query';
import { createFakeDependencies, DependenciesContext } from '../hooks/Dependencies';
import { TooltipProvider } from '../components/Tooltip';

describe('MailDetailPage', () => {
	it('MailDetailPage 제목, 별명, 미리보기, 시간이 있다', async () => {
		const navigation = useFakeNavigation();
		navigation.clear();
		navigation.navigate(toMailDetail('m25669'));

		await runSiheom(given.render(<MailDetailPage />), assertions.visible(query.label(ko.돌아가기), true));
	});

	it('다음 메일이 있으면 다음 메일보기를 눌러서 다음 메일로 replace할 수 있다', async () => {
		const { navigate, useSearchParams } = useFakeNavigation();
		navigate(toMailDetail('m25700'));

		await runSiheom(given.render(<MailDetailPage />), actions.click(query.link('다음 메일 보기')));

		const [searchParams] = useSearchParams();
		const NEXT_ID = 'm25672';
		expect(searchParams.get('mailId')).toBe(NEXT_ID);
	});

	it('뒤로 가기 중에 mailId가 사라져도 에러가 나지 않는다', async () => {
		const navigation = useFakeNavigation();
		navigation.clear();
		navigation.navigate(paths.MAIL_LIST);
		navigation.navigate(toMailDetail('m25669'));

		const fakeDependencies = createFakeDependencies();
		const queryClient = new QueryClient({
			defaultOptions: {
				queries: { retry: false },
			},
		});

		function HydrateAtoms({ children }: { children: React.ReactNode }) {
			useHydrateAtoms([[queryClientAtom, queryClient]]);
			return children;
		}

		function Providers({ children }: { children: React.ReactNode }) {
			return (
				<QueryClientProvider client={queryClient}>
					<Provider>
						<TooltipProvider>
							<HydrateAtoms>
								<DependenciesContext.Provider value={fakeDependencies}>{children}</DependenciesContext.Provider>
							</HydrateAtoms>
						</TooltipProvider>
					</Provider>
				</QueryClientProvider>
			);
		}

		let rerender: (ui: React.ReactElement) => void;
		await act(async () => {
			cleanup();
			({ rerender } = render(
				<Providers>
					<MailDetailPage />
				</Providers>,
			));
			fakeDependencies.usePlatform();
		});

		navigation.goBack();
		expect(navigation.current()).toBe(paths.MAIL_LIST);

		expect(() =>
			act(() => {
				rerender(
					<Providers>
						<MailDetailPage />
					</Providers>,
				);
			}),
		).not.toThrow();
	});
});
