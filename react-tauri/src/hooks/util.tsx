import React from "react";
import { UseQueryResult } from "react-query";

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
