export type RawMailT = {
  id: string;
  member: string;
  time: string;
  subject: string;
  preview: string;
};

export type MailT = RawMailT & {
  isFavorited: boolean;
  isUnread: boolean;
  tags: string[];
};

export type MailBodyT = {
  body: string;
  images: string[];
};

export interface MailRepository {
  getAllMailList: () => Promise<RawMailT[]>;
  getMailBodyDict: () => Promise<Record<string, MailBodyT>>;
  getTagToMailDict: () => Promise<Record<string, string[]>>;
  getMailToTagDict: () => Promise<Record<string, string[]>>;
  getMemberNameDict: () => Promise<Record<string, number>>;
  saveTagToMailDict: (dict: Record<string, string[]>) => Promise<void>;
  saveMailToTagDict: (dict: Record<string, string[]>) => Promise<void>;
}