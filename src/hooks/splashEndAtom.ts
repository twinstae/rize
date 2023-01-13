import { atom } from "jotai";

export function createSuspender(){
  let _resolve = () => {};
  const suspender = new Promise((resolve) => {
    _resolve = () => {
      resolve(null);
      console.log('done!');
    };
  })
  return [suspender, _resolve] as const
}

const [suspender, resolve] = createSuspender();

export const splashEnd = resolve;

export const isSplashEndAtom = atom(async () => suspender);