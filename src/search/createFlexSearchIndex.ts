import { Document as FlexDocument } from 'flexsearch';
import type { CreateIndex, IndexMail } from './types';

const createFlexSearchIndex: CreateIndex = (mailList: IndexMail[]) => {
	const docIndex = new FlexDocument({
		document: {
			id: '', // 'id'
			index: ['subject', 'body'],
		},
		encode: (sent) => sent.split(''),
	});

	mailList.forEach((mail) => docIndex.add(mail));

	return {
		search: (keyword) => {
			if (keyword) {
				return new Set(docIndex.search(keyword).flatMap((unit) => unit.result));
			}
			return new Set(mailList.map((mail) => mail.id));
		},
	};
};

export default createFlexSearchIndex;
