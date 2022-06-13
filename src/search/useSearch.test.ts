import { act, renderHook } from '@testing-library/react-hooks';

import { TEST_MAIL, TEST_MAIL_2 } from '../test/fixtures';
import useSearch from './useSearch';

describe('useSearch', () => {
  const ORIGINAL_LIST = [TEST_MAIL, TEST_MAIL_2];

  function searchKeyword(keyword: string) {
    return {
      then(expected: string[]) {
        const { result } = renderHook(() => useSearch(ORIGINAL_LIST));

        act(() => {
          result.current.search(keyword);
        });

        expect([...result.current.mailIdSet]).toStrictEqual(expected);
      },
    };
  }

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

  it('isInResult는 검색 결과에 있는 id만 true를 반환한다', () => {
    const { result } = renderHook(() => useSearch(ORIGINAL_LIST));

    act(() => {
      result.current.search('노래');
    });
    expect(result.current.isInResult(TEST_MAIL.id)).toBe(true);
    expect(result.current.isInResult(TEST_MAIL_2.id)).toBe(false);
  });
});
