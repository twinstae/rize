import React from "react";
import { Link, Params } from "react-router-dom";

export interface Navigation {
  params: () => Readonly<Params<string>>;
  current: () => string;
  navigate: (path: string) => void;
  goBack: () => void;
  redirect: (path: string) => void;
  Link:
    | ((props: { to: string; children: JSX.Element }) => JSX.Element)
    | typeof Link;
}

export const useFakeNavigation = (): Navigation => {
  const history = ["/"];

  return {
    params: () => ({ mailId: "m123" }),
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
      React.createElement("a", { href: props.to }, props.children),
  };
};
