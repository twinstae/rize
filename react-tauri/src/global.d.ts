import { RawMailT } from './mailList/types';

type Id = string | number;
interface Index {
  search: (keyword: string) => Set<Id>;
}

type CreateIndex = (mailList: RawMailT[]) => Index;


type UsernameT = {
  before: string;
  after: string;
  setBefore: (newBefore: string) => void;
  setAfter: (newAfter: string) => void;
  replaceUsername: (text: string) => string;
};

interface StorageRepository<T> {
  getItem: () => Promise<T | undefined>;
  setItem: (value: T) => Promise<void>;
}
