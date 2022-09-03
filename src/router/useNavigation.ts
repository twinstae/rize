import React from 'react';

import { useDependencies } from '../hooks/Dependencies';
import paths from './paths';

type ParamKeyValuePair = [string, string];
type URLSearchParamsInit =
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;

export interface Navigation {
  params: () => Readonly<{ [key: string]: string | undefined }>;
  useSearchParams: (defaultInit?: URLSearchParamsInit) => readonly [
    URLSearchParams,
    (
      nextInit: URLSearchParamsInit,
      navigateOptions?:
        | {
            replace?: boolean | undefined;
            state?: unknown;
          }
        | undefined
    ) => void
  ];
  current: () => string;
  navigate: (path: string) => void;
  goBack: () => void;
  redirect: (path: string) => void;
  Link: (props: { to: string; children: JSX.Element }) => JSX.Element;
}

const history = [paths.ROOT];
const searchParam = new URLSearchParams();
export const useFakeNavigation = (): Navigation => {
  return {
    params: () => {
      const [, id] = history[history.length - 1].match(/\/mail\/(.+)/) ?? [];
      return { id };
    },
    useSearchParams: () => {
      return [
        searchParam,
        (newInit) => {
          Object.entries(newInit).forEach(([key, value]) =>
            searchParam.set(key, value)
          );
        },
      ];
    },
    current: () => {
      return history[history.length - 1];
    },
    navigate: (path: string) => {
      history.push(path);
    },
    goBack: () => {
      history.pop();
    },
    redirect: (path: string) => {
      history[history.length - 1] = path;
    },
    Link: (props: { to: string; children: JSX.Element }) =>
      React.createElement(
        'span',
        { href: props.to, onClick: () => history.push(props.to) },
        props.children
      ),
  };
};

function useNavigation() {
  return useDependencies().useNavigationImpl();
}

export default useNavigation;
