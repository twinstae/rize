type WrapperT = ({ children }: ChildrenProps) => JSX.Element;

export const pipeWrapper = (...WrapperList: WrapperT[]): WrapperT => {
  return ({ children }) =>
    WrapperList.reduce((acc, Wrapper) => <Wrapper>{acc}</Wrapper>, children);
};