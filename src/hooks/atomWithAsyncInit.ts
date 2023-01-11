import { type Atom, atom } from 'jotai';

const atomWithAsyncInit: <T>(init: () => Promise<T>, fallback: T) => Atom<Promise<T>> = (
  init,
  fallback
) => {
  return atom(async () => init().catch(() => fallback));
};

export default atomWithAsyncInit;
