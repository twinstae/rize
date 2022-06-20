import { atom, useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

import { CreateIndex } from '../global';
import { RawMailT } from '../mailList/types';
import createFlexSearchIndex from './createFlexSearchIndex';

export const keywordAtom = atom('');

export const createUseSearch =
  (createIndex: CreateIndex) => (data: RawMailT[]) => {
    const [keyword, setKeyword] = useAtom(keywordAtom);
    const index = useMemo(() => createIndex(data), [data]);

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
