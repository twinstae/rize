import React from 'react';

type ChildrenProps = {
  children: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >;
};

export type WrapperT = ({ children }: ChildrenProps) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createWrapper = <P extends { [key: string]: any }>(
  Provider: React.FC<P>,
  props: P
): WrapperT => {
  // eslint-disable-next-line react/display-name
  return ({ children }) => <Provider {...props}>{children}</Provider>;
};

export const pipeWrapper = (...WrapperList: WrapperT[]): WrapperT => {
  return ({ children }) =>
    WrapperList.reduce((acc, Wrapper) => <Wrapper>{acc}</Wrapper>, children);
};

export const shuffle: <T>(array: Array<T>) => Array<T> = (array) => {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    const randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    const tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }

  return array;
};
