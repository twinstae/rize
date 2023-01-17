import invariant from '../invariant';
import { IZONE, MEMBER_LIST, memberNameDict } from '../constants';
import { MailT, RawMailT } from './types';
import { Index } from '../search/types';
import { UNREAD, FAVORITE } from './useMailList';

export const modes = ['all', 'unread', 'favorite'] as const;
export type TabMode = typeof modes[number];

const jsonClone: <T>(old: T) => T = (old) => JSON.parse(JSON.stringify(old));

export function reverseTagToMail(
  tagToMailDict: Record<string, string[]>
): Map<string, string[]> {
  return Object.entries(tagToMailDict).reduce((acc, entry) => {
    entry[1].forEach((mailId) => {
      const oldTags = acc.get(mailId) || [];
      oldTags.push(entry[0]);
      acc.set(mailId, oldTags);
    });
    return acc;
  }, new Map<string, string[]>());
}

export function addTagToMail(tag: string, targetMailId: string) {
  return (old: Record<string, string[]>) => {
    const newDict = jsonClone(old);
    const newTags = newDict[tag] ?? [];
    newTags.push(targetMailId);
    newDict[tag] = newTags;
    return newDict;
  };
}

export function removeTagFromMail(tag: string, targetMailId: string) {
  return (old: Record<string, string[]>) => {
    const newDict = jsonClone(old);
    invariant(newDict[tag]);
    newDict[tag] = newDict[tag].filter((mailId) => targetMailId !== mailId);

    return newDict;
  };
}

export function toOriginalName(nameToNumberDict: Record<string, number>) {
  return (raw: string) => memberNameDict[nameToNumberDict[raw]];
}

export function getFilteredMailResult(
  tag: string,
  tagToMailDict: Record<string, string[]>,
  mailList: MailT[],
  index: Index,
  keyword: string
){
  const searchResult = index.search(keyword);
  const inSearchResult = (id: string) => searchResult.has(id);

  const tagSet = tagToMailDict[tag];
  const createByTag = (tag: string) => {
    if (MEMBER_LIST.includes(tag as IZONE)) {
      return (mail: RawMailT) => mail.member === tag;
    }
    return (mail: RawMailT) => tagSet.includes(mail.id);
  };
  const byTag = createByTag(tag);
  const unreadSet = new Set(tagToMailDict[UNREAD]);
  const favoriteSet = new Set(tagToMailDict[FAVORITE]);
  
  const allMailList = tag 
    ? mailList.filter(mail => byTag(mail))
    : mailList;

  if (keyword === ''){
    return {
      'all': allMailList,
      'unread': allMailList.filter((mail) => unreadSet.has(mail.id)),
      'favorite': allMailList.filter((mail) => favoriteSet.has(mail.id))
    };
  }

  return {
    'all': allMailList.filter((mail) => inSearchResult(mail.id)),
    'unread': allMailList.filter((mail) => unreadSet.has(mail.id) && inSearchResult(mail.id)),
    'favorite': allMailList.filter((mail) => favoriteSet.has(mail.id) && inSearchResult(mail.id))
  };
}
