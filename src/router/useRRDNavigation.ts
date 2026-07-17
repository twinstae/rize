import React from 'react';
import { Link as RRLink, useHistory, useLocation } from 'react-router-dom';
import { useIonRouter } from '@ionic/react';
import type { LinkProps, Navigation } from './useNavigation';
import { parseAppPath, toAppPath } from './parseAppPath';

const useRRDNavigation = (): Navigation => {
	const history = useHistory();
	const location = useLocation();
	const ionRouter = useIonRouter();

	return {
		params: () => Object.fromEntries(new URLSearchParams(location.search).entries()),
		useSearchParams: () => {
			const searchParams = new URLSearchParams(location.search);
			const setSearchParams = (newInit: URLSearchParams) => {
				history.replace({
					pathname: location.pathname,
					search: newInit.toString(),
				});
			};
			return [searchParams, setSearchParams] as const;
		},
		current: () => toAppPath(location.pathname),
		navigate: (path: string) => {
			const { pathname, search } = parseAppPath(path);
			history.push({ pathname, search });
		},
		goBack: () => {
			if (ionRouter.canGoBack()) {
				ionRouter.goBack();
			} else {
				history.goBack();
			}
		},
		redirect: (path: string) => {
			const { pathname, search } = parseAppPath(path);
			history.replace({ pathname, search });
		},
		// eslint-disable-next-line react/display-name
		Link: React.forwardRef(({ to, children, isRedirect = false, className, ...props }: LinkProps, ref) => {
			const { pathname, search } = parseAppPath(to);
			return React.createElement(
				RRLink,
				{
					ref,
					to: `${pathname}${search}`,
					replace: isRedirect,
					className,
					...props,
				},
				children,
			);
		}),
	};
};

export default useRRDNavigation;
