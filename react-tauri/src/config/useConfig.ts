import { useAtom, WritableAtom } from "jotai";
import { useMemo } from "react";
import atomWithPersit from "../hooks/atomWithPersist";
import { useDependencies } from "../hooks/Dependencies";
import { JsonObject, JsonValue } from "../types/json";

const useConfigAtom = () => {
  const { storageRepo } = useDependencies()
  return useMemo(() => atomWithPersit({}, storageRepo) as WritableAtom<JsonObject, unknown, void>, [storageRepo])
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
