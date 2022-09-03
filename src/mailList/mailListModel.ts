import { IZONE, MEMBER_LIST, memberNameDict } from '../constants';
import { MailT } from './types';

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
    if (newDict[tag]) {
      newDict[tag] = newDict[tag].filter((mailId) => targetMailId !== mailId);
    }

    return newDict;
  };
}

export function toOriginalName(nameToNumberDict: Record<string, number>) {
  return (raw: string) => memberNameDict[nameToNumberDict[raw]];
}

export function filterByModeAndTag(
  tagToMailDict: Record<string, string[]>,
  isFavorited: (mailId: string) => boolean,
  isUnread: (mailId: string) => boolean
) {
  return (mode: TabMode, tag: string) => {
    const byMode = (mail: MailT): boolean => {
      if (mode === 'unread') {
        return isUnread(mail.id);
      }
      if (mode === 'favorite') {
        return isFavorited(mail.id);
      }

      return true;
    };

    const byTag: (mail: MailT) => boolean = (mail) => {
      if (MEMBER_LIST.includes(tag as IZONE)) {
        return mail.member === tag;
      }

      if (tag === '' || tagToMailDict[tag] === undefined) {
        return true;
      }
      return tagToMailDict[tag].includes(mail.id);
    };

    return (item: MailT) => byMode(item) && byTag(item);
  };
}
