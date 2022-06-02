import React from "react";
import { UseQueryResult } from "react-query";

type ChildrenProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

export type WrapperT = ({ children }: ChildrenProps) => JSX.Element;

export const createWrapper = <P extends Record<string, any>>(
  Provider: React.FC<P>,
  props: P
): WrapperT => {
  return ({ children }) => <Provider {...props}>{children}</Provider>;
};

export const pipeWrapper = (...WrapperList: WrapperT[]): WrapperT => {
  return ({ children }) =>
    WrapperList.reduce((acc, Wrapper) => <Wrapper>{acc}</Wrapper>, children);
};

type RenderQueryT = <D>(
  query: UseQueryResult<D, Error>,
  render: (data: D) => JSX.Element,
  onError?: (error: Error) => JSX.Element
) => JSX.Element;

export const renderQuery: RenderQueryT = (
  query,
  render,
  onError = (error) => <span>{JSON.stringify(error)}</span>
) => {
  const { data, isLoading, error } = query;
  if (isLoading || data === undefined) return <span>로딩중</span>;

  if (error) return onError(error);

  return render(data);
};

export const SuspenseWrapper = createWrapper(React.Suspense, {
  fallback: <span>로딩 중</span>,
});

export const withSuspense: <T>(Component: React.FC<T>) => React.FC<T> =
  (Component) => (props) =>
    SuspenseWrapper({ children: <Component {...props} /> });

export const shuffle = (array: Array<any>) => {

  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }

  return array
}