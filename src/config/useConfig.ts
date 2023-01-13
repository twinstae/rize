import { useAtom, WritableAtom } from 'jotai';

import atomWithPersit from '../hooks/atomWithPersist';
import { useDependencies } from '../hooks/Dependencies';
import { JsonObject, JsonValue } from '../types/json';

let atom: WritableAtom<Promise<JsonObject>, unknown, void> | undefined;

const useConfigAtom = () => {
  const { storageRepo } = useDependencies();
  if(atom === undefined){
    atom = atomWithPersit({}, storageRepo) as WritableAtom<Promise<JsonObject>, unknown, void>;
  }
  return atom;
};

export const useConfig = () => {
  const [config, setConfig] = useAtom(useConfigAtom());

  return {
    get: (key: string) => config[key],
    set: (key: string, value: JsonValue) => {
      setConfig((old: JsonObject) => ({ ...old, [key]: value }));
    },
  };
};

export type ConfigT = {
  get: (key: string) => JsonValue | undefined;
  set: (key: string, value: JsonValue) => void;
}

export default useConfig;
