import { Atom, atom } from 'jotai';

const atomWithAsyncInit: <T>(init: () => Promise<T>, fallback: T) => Atom<T> = (
  init,
  fallback
) => {
  const baseAtom = atom(fallback);
  baseAtom.onMount = (setValue) => {
    init().then(setValue).catch(() => null);
  };

  return baseAtom;
};

export default atomWithAsyncInit;
