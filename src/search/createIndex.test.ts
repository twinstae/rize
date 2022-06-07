import { describe, it } from 'vitest';

import { TEST_MAIL, TEST_MAIL_2 } from '../test/fixtures';
import createFlexSearchIndex from './createFlexSearchIndex';

describe('useSearch', () => {
  const ORIGINAL_LIST = [TEST_MAIL, TEST_MAIL_2];

  function searchKeyword(keyword: string) {
    return {
      then(expected: string[]) {
        const index = createFlexSearchIndex(ORIGINAL_LIST);
        expect([...index.search(keyword)]).toStrictEqual(expected);
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
});
