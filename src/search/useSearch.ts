import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

import createFlexSearchIndex from './createFlexSearchIndex';
import { CreateIndex, IndexMail } from './types';

export const keywordAtom = atom('');

export const createUseSearch =
  (createIndex: CreateIndex) => (data: IndexMail[]) => {
    const [keyword, setKeyword] = useAtom(keywordAtom);
    const index = useMemo(() => createIndex(data.map(mail => ({
      ...mail,
      body: mail.body.replace(new RegExp('&nbsp;', 'g'), ' ')
    }))), [data]);

    const searchResultSet = useMemo(
      () => index.search(keyword),
      [index, keyword]
    );

    return {
      isInResult: (id: string) => searchResultSet.has(id),
      keyword,
      search: setKeyword,
    };
  };

export default createUseSearch(createFlexSearchIndex);
