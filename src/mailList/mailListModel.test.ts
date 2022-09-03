import { MEMBER_LIST } from '../constants';
import { TEST_MAIL } from '../test/fixtures';
import fakeMailRepository from './fakeMailRepository';
import {
  addTagToMail,
  filterByModeAndTag,
  removeTagFromMail,
  reverseTagToMail,
  TabMode,
  toOriginalName,
} from './mailListModel';
import { MailT } from './types';

const tagToMailDict = {
  tag1: ['mail1', 'mail2'],
};

it('reverseTagToMail', () => {
  const result = reverseTagToMail(tagToMailDict);

  expect(result.get('mail1')).toEqual(['tag1']);
  expect(result.get('mail2')).toEqual(['tag1']);
});

it('addTagToMail: 기존 태그에 메일 추가', () => {
  const result = addTagToMail('tag1', 'mail3')(tagToMailDict);

  expect(result['tag1']).toEqual(['mail1', 'mail2', 'mail3']);
});

it('addTagToMail: 빈 태그에 메일 추가', () => {
  const result = addTagToMail('tag1', 'mail3')({});

  expect(result['tag1']).toEqual(['mail3']);
});

it('removeTagFromMail', () => {
  const result = removeTagFromMail('tag1', 'mail1')(tagToMailDict);

  expect(result['tag1']).toEqual(['mail2']);
});

const UNREAD_UNFAVORITED_YURI_MAIL1: MailT = {
  ...TEST_MAIL,
  id: 'mail1',
};

const READ_FAVORITED_HITOMI_MAIL2: MailT = {
  ...TEST_MAIL,
  member: '혼다 히토미',
  id: 'mail2',
};

const UNREAD_UNFAVORITED_YURI_MAIL3: MailT = {
  ...TEST_MAIL,
  id: 'mail3',
};

const testSuites: [string, [TabMode, string], [boolean, boolean, boolean]][] = [
  ['both mode and tag', ['unread', 'tag1'], [true, false, false]],
  ['only by tag', ['all', 'tag1'], [true, true, false]],
  ['empty tag', ['all', 'not exists tag'], [true, true, true]],
  ['by member tag', ['all', '조유리'], [true, false, true]],
  ['only by mode', ['favorite', ''], [false, true, false]],
  ['all', ['all', ''], [true, true, true]],
];

testSuites.forEach(([label, input, expected]) => {
  it(label, () => {
    const predicate = filterByModeAndTag(
      tagToMailDict,
      (mailId) => mailId === READ_FAVORITED_HITOMI_MAIL2.id,
      (mailId) =>
        mailId === UNREAD_UNFAVORITED_YURI_MAIL3.id ||
        mailId === UNREAD_UNFAVORITED_YURI_MAIL1.id
    )(...input);

    expect(
      [
        UNREAD_UNFAVORITED_YURI_MAIL1,
        READ_FAVORITED_HITOMI_MAIL2,
        UNREAD_UNFAVORITED_YURI_MAIL3,
      ].map(predicate)
    ).toEqual(expected);
  });
});

MEMBER_LIST.forEach((member) => {
  it(`toOriginalName: ${member}`, async () => {
    const memberNameDict = await fakeMailRepository.getMemberNameDict();
    expect(toOriginalName(memberNameDict)(member)).toBe(member);
  });
});
