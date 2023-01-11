import { YURI_MAIL_M25752, TEST_MAIL_2 } from '../test/fixtures';
import createFlexSearchIndex from './createFlexSearchIndex';

describe('useSearch', () => {
  const ORIGINAL_LIST = [YURI_MAIL_M25752, TEST_MAIL_2];

  function searchKeyword(keyword: string) {
    return {
      then(expected: string[]) {
        const index = createFlexSearchIndex(ORIGINAL_LIST);
        expect([...index.search(keyword)]).toStrictEqual(expected);
      },
    };
  }

  it('검색어를 입력하지 않으면 모든 목록이 나온다', () => {
    searchKeyword('').then([YURI_MAIL_M25752.id, TEST_MAIL_2.id]);
  });

  describe('검색어를 입력하면 해당하는 메일만 걸러진다', () => {
    it('핫초코', () => {
      searchKeyword('핫초코').then([TEST_MAIL_2.id]);
    });

    it('body: 평소 보내던 메일과는 조금 다른 메일이 될 것 같아요', () => {
      searchKeyword('평소 보내던 메일과는 조금 다른 메일이 될 것 같아요').then([YURI_MAIL_M25752.id]);
    });
  });
});
