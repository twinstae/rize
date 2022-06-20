import { Document } from 'flexsearch';

import { CreateIndex } from '../global';
import { RawMailT } from '../mailList/types';

const createFlexSearchIndex: CreateIndex = (mailList: RawMailT[]) => {
  const index = new Document({
    document: {
      id: '', // 'id'
      index: ['subject', 'preview'],
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
