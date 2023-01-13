import { atom } from 'jotai';

export function createSuspender(){
  let _resolve = () => undefined;
  const suspender = new Promise((resolve) => {
    _resolve = () => {
      resolve(null);
      return undefined;
    };
  });
  return [suspender, _resolve] as const;
}

const [suspender, resolve] = createSuspender();

export const splashEnd = resolve;

export const isSplashEndAtom = atom(async () => suspender);