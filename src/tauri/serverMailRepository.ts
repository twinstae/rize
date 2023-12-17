import { fetch } from '@tauri-apps/plugin-http';

import { MailBodyT, MailRepository, RawMailT } from '../mailList/types';
const HOST = 'http://localhost:5173';
const readJSONfile: (path: string) => Promise<unknown> = (path) =>
	fetch(HOST + '/' + path).then((res) => res.json());

const writeJSONfile = (path: string) => async (dict: Record<string, string[]>) => {
	await fetch(HOST + '/' + path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dict),
	});
};

const serverMailRepository: MailRepository = {
	getAllMailList: async () => readJSONfile('pm_list.json') as Promise<RawMailT[]>,
	getMailBodyDict: async () => readJSONfile('mail_body_dict.json') as Promise<Record<string, MailBodyT>>,
	getMemberNameDict: async () => readJSONfile('member_name.json') as Promise<Record<string, number>>,
	getTagToMailDict: async () => readJSONfile('tag_to_mail_dict.json') as Promise<Record<string, string[]>>,
	saveTagToMailDict: writeJSONfile('tag_to_mail_dict.json'),
	status: async () => fetch(HOST + '/status').then((res) => res.json() as Promise<{ [fileName: string]: boolean }>),
};

export default serverMailRepository;
