type MailT = {
  id: string;
  member: IZONE;
  time: string;
  subject: string;
  preview: string;
};

type MailBodyT = {
  body: string;
  image: string;
};

type IZONE =
  | "권은비"
  | "미야와키 사쿠라"
  | "강혜원"
  | "최예나"
  | "이채연"
  | "김채원"
  | "김민주"
  | "야부키 나코"
  | "혼다 히토미"
  | "조유리"
  | "안유진"
  | "장원영";

type ChildrenProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

type TranslationProps = {
  t: (text: string) => string;
};

type Id = string | number;
interface Index {
  search: (keyword: string) => Set<Id>;
}

type CreateIndex = (mailList: MailT[]) => Index;

interface MailRepository {
  getAllMailList: () => Promise<MailT[]>;
  getMailBodyDict: () => Promise<Record<string, MailBodyT>>;
}

type WrapperT = ({ children }: ChildrenProps) => JSX.Element;

type UsernameServiceT = {
  before: string;
  after: string;
  setBefore: (newBefore: string) => void;
  setAfter: (newAfter: string) => void;
  replaceUsername: (text: string) => string;
};

interface StorageRepository {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
}
