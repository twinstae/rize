import { useMemo } from 'react';
import { useDependencies } from '../hooks/Dependencies';
import useSearch from '../search/useSearch';
import { modes } from './mailListModel';
import useTag from './useTag';

export function useResults() {
  const { mailList } = useDependencies().useMailList();
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
