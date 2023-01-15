import { atom } from 'jotai';
import withDefault from '../withDefault';
import invariant from '../invariant';

const atomWithAsyncInit = <T>(initialValue: T, load: () => Promise<T>, save: (item: T) => Promise<void>) => {
  const baseAtom = atom(initialValue);
  baseAtom.onMount = (setValue) => {
    load().catch(withDefault(initialValue)).then(item => setValue(item));
  };
  let id: number | NodeJS.Timeout | undefined;
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      invariant(typeof update === 'function', '함수로만 업데이트할 수 있습니다.');
      const nextValue = update(get(baseAtom));
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
