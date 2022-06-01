import React from "react";
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { Navigation } from "./useNavigation";

const useRRDNavigation = (): Navigation => {
  const history = useHistory();
  const { pathname } = useLocation();
  return {
    params: useParams,
    current: () => pathname,
    navigate: (path: string) => {
      history.push(path);
    },
    goBack: () => {
      history.goBack();
    },
    redirect: (path: string) => {
      history.replace(path, { replace: true });
    },
    Link: ({ to, children }: { to: string; children: JSX.Element }) =>
      React.createElement(Link, { to }, children),
  };
};

export default useRRDNavigation;
