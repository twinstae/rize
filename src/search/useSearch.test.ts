import { renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';

import { TEST_MAIL, TEST_MAIL_2 } from '../test/fixtures';
import { IndexMail } from './types';
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
      const [data, setData] = useState([] as IndexMail[]);
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
    it('subject: おはよう💕', () => {
      searchKeyword('おはよう💕').then([TEST_MAIL_2.id]);
    });

    it('body: 평소 보내던 메일과는 조금 다른 메일이 될 것 같아요', () => {
      searchKeyword('평소 보내던 메일과는 조금 다른 메일이 될 것 같아요').then([TEST_MAIL.id]);
    });
  });
});
