import { atom } from 'jotai';

const atomWithAsyncInit = <T>(initialValue: T, load: () => Promise<T>, save: (item: T) => Promise<void>) => {
  const baseAtom = atom(initialValue);
  baseAtom.onMount = (setValue) => {
    load().then(item => setValue(item));
  };
  let id: number | NodeJS.Timeout | undefined;
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      clearTimeout(id);
      id = setTimeout(() =>{
        save(nextValue);
      }, 1000);
    }
  );
  return derivedAtom;
};

export default atomWithAsyncInit;
