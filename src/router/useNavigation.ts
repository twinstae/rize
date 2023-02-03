import React, { type ForwardRefExoticComponent, type RefAttributes } from 'react';
import { useDependencies } from '../hooks/Dependencies';

export type LinkProps = React.ComponentProps<'a'> & { to: string; isRedirect?: boolean; children: React.ReactNode; className?: string };

export interface Navigation {
	params: () => Readonly<{ [key: string]: string | undefined }>;
	useSearchParams: (defaultInit?: URLSearchParams) => readonly [
		URLSearchParams,
		(
			nextInit: URLSearchParams,
			navigateOptions?:
				| {
						replace?: boolean | undefined;
						state?: unknown;
					}
				| undefined,
		) => void,
	];
	current: () => string;
	navigate: (path: string) => void;
	goBack: () => void;
	redirect: (path: string) => void;
	Link: ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>;
}

function useNavigation() {
	return useDependencies().useNavigationImpl();
}

export function useSearchParam(key: string) {
	const navigation = useNavigation();
	const [searchParams] = navigation.useSearchParams();
	return searchParams.get(key);
}

export default useNavigation;
