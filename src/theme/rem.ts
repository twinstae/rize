import invariant from '../invariant';

export function rem(n: number) {
  if(window.process?.env?.VITEST){
    return n * 16;
  }
  const documentElement = document.documentElement;
  invariant(documentElement);
  return n * (parseFloat(getComputedStyle(document.documentElement).fontSize));
}
