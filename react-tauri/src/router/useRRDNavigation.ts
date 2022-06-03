import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Navigation } from './useNavigation';

const useRRDNavigation = (): Navigation => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return {
    params: useParams,
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
    Link: ({ to, children }: { to: string; children: JSX.Element }) =>
      React.createElement(Link, { to }, children),
  };
};

export default useRRDNavigation;
