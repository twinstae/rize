import React from 'react';

export interface Navigation {
  params: () => Readonly<{[key:string]: string | undefined}>;
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
        'a',
        { href: props.to, onClick: () => history.push(props.to) },
        props.children
      ),
  };
};
