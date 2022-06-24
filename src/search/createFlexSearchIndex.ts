import { Document } from 'flexsearch';

import { CreateIndex, IndexMail } from './types';

const createFlexSearchIndex: CreateIndex = (mailList: IndexMail[]) => {
  const index = new Document({
    document: {
      id: '', // 'id'
      index: ['subject', 'body'],
    },
    // eslint-disable-next-line no-control-regex
    encode: (str: string) => str.split(''),
  });

  mailList.forEach((mail) => index.add(mail));

  return {
    search: (keyword) => {
      if (keyword) {
        return new Set(index.search(keyword).flatMap((unit) => unit.result));
      }
      return new Set(mailList.map((mail) => mail.id));
    },
  };
};

export default createFlexSearchIndex;
