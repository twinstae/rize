import React from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { LinkProps, Navigation } from './useNavigation';

const useRRDNavigation = (): Navigation => {
	const navigate = useNavigate();

	const { pathname } = useLocation();
	return {
		params: useParams,
		useSearchParams,
		current: () => pathname,
		navigate: (path: string) => {
			navigate(path);
		},
		goBack: () => {
			navigate(-1);
		},
		redirect: (path: string) => {
			navigate(path, { replace: true });
		},
		Link: ({ className, to, children }: LinkProps) => React.createElement(Link, { to, className }, children),
	};
};

export default useRRDNavigation;
