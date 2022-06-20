import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import { RawMailT } from '../mailList/types';

import { TEST_MAIL, TEST_MAIL_2 } from '../test/fixtures';
import useSearch from './useSearch';

describe('useSearch', () => {
  const ORIGINAL_LIST = [TEST_MAIL, TEST_MAIL_2];

  function searchKeyword(keyword: string) {
    return {
      then(expected: string[]) {
        const { result } = renderHook(() => useSearch(ORIGINAL_LIST));

        result.current.search(keyword);

        expected.forEach(expectedId => expect(result.current.isInResult(expectedId)).toBe(true));
      },
    };
  }

  it('처음에는 모든 목록이 보인다.', () => {
    const { result } = renderHook(() => useSearch(ORIGINAL_LIST));
    [TEST_MAIL.id, TEST_MAIL_2.id].forEach(expectedId => expect(result.current.isInResult(expectedId)).toBe(true));
  });

  it('data가 바뀌면 새로 index를 생성한다', () => {
    const { result } = renderHook(() => {
      const [data, setData] = useState([] as RawMailT[]);
      return {
        ...useSearch(data),
        setData,
      };
    });
    [TEST_MAIL.id, TEST_MAIL_2.id].forEach(expectedId => expect(result.current.isInResult(expectedId)).toBe(false));
    
    result.current.setData(ORIGINAL_LIST);
    [TEST_MAIL.id, TEST_MAIL_2.id].forEach(expectedId => expect(result.current.isInResult(expectedId)).toBe(true));
  });

  it('검색어를 입력하지 않으면 모든 목록이 나온다', () => {
    searchKeyword('').then([TEST_MAIL.id, TEST_MAIL_2.id]);
  });

  describe('검색어를 입력하면 해당하는 메일만 걸러진다', () => {
    it('핫초코', () => {
      searchKeyword('핫초코').then([TEST_MAIL_2.id]);
    });

    it('노래', () => {
      searchKeyword('노래').then([TEST_MAIL.id]);
    });
  });
});
