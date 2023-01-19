import { IZONE } from '../constants';
import { JsonValue } from '../types/json';

export type RawMailT = {
	id: string;
	member: string;
	time: string;
	subject: string;
	preview: string;
};

export type MailT = RawMailT & MailBodyT & { member: IZONE | '운영팀', bodyText: string };

export type MailBodyT = {
	body: string;
	images: string[];
};

export interface MailRepository {
	getAllMailList: () => Promise<RawMailT[]>;
	getMailBodyDict: () => Promise<Record<string, MailBodyT>>;
	getTagToMailDict: () => Promise<Record<string, string[]>>;
	getMemberNameDict: () => Promise<Record<string, number>>;
	saveTagToMailDict: (dict: Record<string, string[]>) => Promise<void>;
	status: () => Promise<{ [fileName: string]: boolean }>;
}

export interface FsJSON {
	writeJSONfile: (path: string) => (dict: JsonValue) => Promise<void>;
	readJSONfile: <T extends JsonValue>(path: string) => Promise<T>;
}
