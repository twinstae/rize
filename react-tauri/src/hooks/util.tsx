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
