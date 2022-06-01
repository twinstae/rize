import { useAtom, WritableAtom } from "jotai";
import { StorageRepository } from "../global";
import atomWithPersit from "../hooks/atomWithPersist";
import { JsonObject, JsonValue } from "../types/json";
import fakeStorageRepo from "./fakeStorageRepo";

export const createConfigAtom = (storageRepo: StorageRepository<JsonValue>) => {
  return atomWithPersit({}, storageRepo) as WritableAtom<JsonObject, unknown, void>
}

export const createUseConfig = (configAtom: WritableAtom<JsonObject, (key: string, value: JsonValue)=>void>) => {
  return () => {
    const [config, setConfig] = useAtom(configAtom);

    return {
      get: (key: string) => config[key],
      set: (key: string, value: JsonValue) => {
        setConfig(() => ({ ...config, [key]: value }));
      },
    };
  }
}


const fakeConfigAtom = createConfigAtom(fakeStorageRepo)

export const useFakeConfig = createUseConfig(fakeConfigAtom)

const configAtom = fakeConfigAtom

const useConfig = createUseConfig(configAtom)

export type ConfigT = {
  get: (key: string) => JsonValue | undefined;
  set: (key: string, value: JsonValue) => void;
}

export default useConfig;
