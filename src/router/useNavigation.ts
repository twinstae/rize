import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDependencies } from '../hooks/Dependencies';

export interface Navigation {
  params: () => Readonly<{[key:string]: string | undefined}>;
  useSearchParams: typeof useSearchParams;
  current: () => string;
  navigate: (path: string) => void;
  goBack: () => void;
  redirect: (path: string) => void;
  Link:
    | ((props: { to: string; children: JSX.Element }) => JSX.Element)
}

export const useFakeNavigation = (): Navigation => {
  const history = ['/'];

  return {
    params: () => ({ mailId: 'm123' }),
    useSearchParams: () => {
      const searchParam = new URLSearchParams();
      return [searchParam, (newInit) => { 
        Object.entries(newInit).forEach(([key, value]) => searchParam.set(key, value));
      }];
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

function useNavigation(){
  const { useNavigationImpl } = useDependencies();

  return useNavigationImpl();
}

export default useNavigation;