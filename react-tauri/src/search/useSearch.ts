import { useMemo, useState } from "react";
import createFlexSearchIndex from "./createFlexSearchIndex";

export const createUseSearch =
  (createIndex: CreateIndex) => (mailList: MailT[]) => {
    const [keyword, setKeyword] = useState("");

    const index = useMemo(() => createIndex(mailList), [mailList]);

    const searchResultSet = useMemo(
      () => index.search(keyword),
      [index, keyword]
    );

    return {
      mailIdSet: searchResultSet,
      search: setKeyword,
    };
  };

export default createUseSearch(createFlexSearchIndex);
