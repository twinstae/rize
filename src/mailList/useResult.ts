import { useMemo } from 'react';
import useSearch from '../search/useSearch';
import { modes } from './mailListModel';
import useTag from './useTag';
import { useMailList } from './useMailList';

export function useResults() {
  const { mailList } = useMailList();
  const allMailList = mailList('all', '') || [];
  const { isInResult, keyword } = useSearch(allMailList);
  const [tag] = useTag();

  const rawResults = modes.map((mode) => mailList(mode, tag));
  return useMemo(() =>{
    return keyword !== ''
      ? rawResults.map((data) => data.filter((mail) => isInResult(mail.id)))
      : rawResults;
  }, [rawResults, keyword]);
}
