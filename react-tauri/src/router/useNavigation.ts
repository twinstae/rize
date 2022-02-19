import { Params } from "react-router-dom";

export interface Navigation {
  params: () => Readonly<Params<string>>;
  current: () => string;
  navigate: (path: string) => void;
  goBack: () => void;
  redirect: (path: string) => void;
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
  };
};
