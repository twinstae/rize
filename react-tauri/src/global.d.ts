type RawMailT = {
  id: string;
  member: string;
  time: string;
  subject: string;
  preview: string;
};

type MailT = RawMailT & {
  isFavorited: boolean;
  isUnread: boolean;
  tags: string[];
};

type MailBodyT = {
  body: string;
  images: string[];
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
  | "장원영"
  | "운영팀";

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

type CreateIndex = (mailList: RawMailT[]) => Index;

interface MailRepository {
  getAllMailList: () => Promise<RawMailT[]>;
  getMailBodyDict: () => Promise<Record<string, MailBodyT>>;
  getTagToMailDict: () => Promise<Record<string, string[]>>;
  getMailToTagDict: () => Promise<Record<string, string[]>>;
  saveTagToMailDict: (dict: Record<string, string[]>) => void;
  saveMailToTagDict: (dict: Record<string, string[]>) => void;
}

type WrapperT = ({ children }: ChildrenProps) => JSX.Element;

type UsernameServiceT = {
  isSuccess: boolean;
  before: string;
  after: string;
  mutation: {
    isLoading: boolean;
    mutate: (v: { key: string; value: string }) => void;
  };
  setBefore: (newBefore: string) => void;
  setAfter: (newAfter: string) => void;
  replaceUsername: (text: string) => string;
};

interface StorageRepository {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
}

type TabMode = "all" | "unread" | "favorite";
