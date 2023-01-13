type UsernameT = {
  before: string;
  after: string;
  setBefore: (newBefore: string) => void;
  setAfter: (newAfter: string) => void;
  replaceUsername: (text: string) => string;
};

export interface StorageRepository<T> {
  getItem: (key: string) => Promise<T | undefined>;
  setItem: (key: string, value: T) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}
