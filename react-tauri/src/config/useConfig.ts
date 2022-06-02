import { useAtom, WritableAtom } from "jotai";
import { useMemo } from "react";
import atomWithPersit from "../hooks/atomWithPersist";
import { useDependencies } from "../hooks/Dependencies";
import { JsonObject, JsonValue } from "../types/json";

let atom: WritableAtom<JsonObject, unknown, void> | undefined

const useConfigAtom = () => {
  const { storageRepo } = useDependencies()
  if(atom === undefined){
    atom = atomWithPersit({}, storageRepo) as WritableAtom<JsonObject, unknown, void>
  }
  return atom; 
}

export const useConfig = () => {
  const [config, setConfig] = useAtom(useConfigAtom());

  return {
    get: (key: string) => config[key],
    set: (key: string, value: JsonValue) => {
      setConfig(() => ({ ...config, [key]: value }));
    },
  };
}

export type ConfigT = {
  get: (key: string) => JsonValue | undefined;
  set: (key: string, value: JsonValue) => void;
}

export default useConfig;
