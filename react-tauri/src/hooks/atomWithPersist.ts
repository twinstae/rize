import { atom } from 'jotai';

import { StorageRepository } from '../global';

const atomWithPersit = <T>(fallback: T, repo: StorageRepository<T>) => {
  const baseAtom = atom(fallback);
  baseAtom.onMount = (setValue) => {
    repo.getItem().then(v => setValue(() => v ?? fallback));
  };
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      repo.setItem(nextValue);
    }
  );
  return derivedAtom;
};

export default atomWithPersit;