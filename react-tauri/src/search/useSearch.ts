import { atom, useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import useMailList from "../mailList/useMailList";
import createFlexSearchIndex from "./createFlexSearchIndex";

export const keywordAtom = atom("");

export const createUseSearch = (createIndex: CreateIndex) => () => {
  const { data } = useMailList().mailList("all", "");
  const [keyword, setKeyword] = useAtom(keywordAtom);

  const index = useMemo(() => createIndex(data!), [data]);

  const searchResultSet = useMemo(
    () => index.search(keyword),
    [index, keyword]
  );

  return {
    mailIdSet: searchResultSet,
    isInResult: useCallback(
      (id: string) => searchResultSet.has(id),
      [searchResultSet]
    ),
    keyword,
    search: setKeyword,
  };
};

export default createUseSearch(createFlexSearchIndex);
