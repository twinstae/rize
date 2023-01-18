import { CreateIndex, IndexMail } from './types';
import { getRegExp } from 'korean-regexp';

const cache = new Map();
function cached(key: string, func: (keyword: string) => RegExp) {
	if (!cache.has(key)) {
		cache.set(key, func(key));
	}
	return cache.get(key);
}

export const getCachedRegex = (keyword: string) => cached(keyword, (text) => getRegExp(text));

const createRegexSearchIndex: CreateIndex = (mailList: IndexMail[]) => {
	const allMailIdSet = new Set(mailList.map((mail) => mail.id));
	return {
		search: (keyword) => {
			if (keyword) {
				const regex = getCachedRegex(keyword);
				return new Set(
					mailList.filter((mail) => regex.test(mail.subject) || regex.test(mail.bodyText)).map((mail) => mail.id),
				);
			}
			return allMailIdSet;
		},
	};
};

export default createRegexSearchIndex;
