import { http } from '@tauri-apps/api';

import { MailBodyT, MailRepository, RawMailT } from '../mailList/types';
const HOST = 'http://localhost:5173';
const readJSONfile: (path: string) => Promise<unknown> = (path) =>
	http.fetch(HOST + '/' + path).then((res) => res.data);

const writeJSONfile = (path: string) => async (dict: Record<string, string[]>) => {
	await http.fetch(HOST + '/' + path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: http.Body.json(dict),
	});
};

const serverMailRepository: MailRepository = {
	getAllMailList: async () => readJSONfile('pm_list.json') as Promise<RawMailT[]>,
	getMailBodyDict: async () => readJSONfile('mail_body_dict.json') as Promise<Record<string, MailBodyT>>,
	getMemberNameDict: async () => readJSONfile('member_name.json') as Promise<Record<string, number>>,
	getTagToMailDict: async () => readJSONfile('tag_to_mail_dict.json') as Promise<Record<string, string[]>>,
	saveTagToMailDict: writeJSONfile('tag_to_mail_dict.json'),
	status: async () => http.fetch(HOST + '/status').then((res) => res.data as { [fileName: string]: boolean }),
};

export default serverMailRepository;
