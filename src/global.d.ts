type UsernameT = {
  before: string;
  after: string;
  setBefore: (newBefore: string) => void;
  setAfter: (newAfter: string) => void;
  replaceUsername: (text: string) => string;
};

export interface StorageRepository<T> {
  getItem: () => Promise<T | undefined>;
  setItem: (value: T) => Promise<void>;
}
