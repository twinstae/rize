import React from 'react';
import paths from './paths';
import { LinkProps, Navigation } from './useNavigation';

const history: string[] = [paths.ROOT];

const searchParams = new URLSearchParams();
const setSearchParams = (newInit: URLSearchParams) => {
	[...searchParams.keys()].forEach((key) => {
		searchParams.delete(key);
	});
	new URLSearchParams(newInit).forEach((value, key) => searchParams.set(key, value));
};

const mutateHistory = (mutate: (old: typeof history) => void) => {
	mutate(history);
	setSearchParams(new URLSearchParams(history[history.length - 1].split('?')[1]));
};

const fakeNavigation = {
	clear: () => {
		mutateHistory((old) => {
			old.length = 0;
			old.push(paths.ROOT);
		});
	},
	params: () => {
		const current = history[history.length - 1].split('?')[1];
		return Object.fromEntries(new URLSearchParams(current).entries());
	},
	useSearchParams: () => {
		return [searchParams, setSearchParams];
	},
	current: () => {
		return history[history.length - 1];
	},
	navigate: (path: string) =>
		mutateHistory((old) => {
			old.push(path);
		}),
	goBack: () =>
		mutateHistory((old) => {
			if (old.length > 1) {
				old.pop();
			}
		}),
	redirect: (path: string) =>
		mutateHistory((old) => {
			old[old.length - 1] = path;
		}),
	// eslint-disable-next-line react/display-name
	Link: React.forwardRef(({ to, ...props }: LinkProps, ref) =>
		React.createElement(
			'a',
			{
				ref,
				href: to,
				onClick: (e: Event) => {
					e.preventDefault();
					mutateHistory((old) => {
						old.push(to);
					});
				},
				...props,
			},
			props.children,
		)),
} satisfies Navigation & { clear: () => void };
export const useFakeNavigation = () => {
	return fakeNavigation;
};