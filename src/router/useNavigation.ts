import React from 'react';
import { useDependencies } from '../hooks/Dependencies';
import paths from './paths';

export type LinkProps = React.ComponentProps<'a'> & { to: string; children: React.ReactNode }

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
        | undefined
    ) => void
  ];
  current: () => string;
  navigate: (path: string) => void;
  goBack: () => void;
  redirect: (path: string) => void;
  Link: (props: LinkProps) => JSX.Element;
}

const history = [paths.ROOT];

const searchParams = new URLSearchParams();
const setSearchParams = (newInit: URLSearchParams) => {
  [...searchParams.keys()].forEach((key) => {
    searchParams.delete(key);
  });
  new URLSearchParams(newInit).forEach((value, key) =>
    searchParams.set(key, value)
  );
};

const mutateHistory = (mutate: (old: typeof history) => void) => {
  mutate(history);
  setSearchParams(new URLSearchParams((history.at(-1) ?? '?').split('?')[1] ?? ''));
};

const fakeNavigation = {
  clear: () => {
    mutateHistory((old) => { old.length = 0; old.push(paths.ROOT); });
  },
  params: () => {
    const [, id] = history[history.length - 1].match(/\/mail\/(.+)/) ?? [];
    return { id };
  },
  useSearchParams: () => {
    return [
      searchParams,
      setSearchParams,
    ];
  },
  current: () => {
    return history[history.length - 1];
  },
  navigate: (path: string) => mutateHistory((old) => {
    old.push(path);
  }),
  goBack: () => mutateHistory((old) => {
    old.pop();
  }),
  redirect: (path: string) => mutateHistory((old) => {
    old[old.length - 1] = path;
  }),
  Link: (props: LinkProps) =>
    React.createElement(
      'a',
      {
        href: props.to, onClick: (e: Event) => {
          e.preventDefault();
          mutateHistory((old) => {
            old.push(props.to);
          });
        }
      },
      props.children
    ),
} satisfies Navigation & { clear: () => void };
export const useFakeNavigation = () => {
  return fakeNavigation;
};

if (typeof window.afterEach === 'function') {
  afterEach(() => {
    fakeNavigation.clear();
  });
}

function useNavigation() {
  return useDependencies().useNavigationImpl();
}

export function useSearchParam(key: string){
  const navigation = useNavigation();
  const [searchParams] = navigation.useSearchParams();
  return searchParams.get(key);
}

export default useNavigation;
