import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';

import { IZONE } from '../constants';
import {
	FAVORITE,
	UNREAD,
	addTagToMail,
	getFilteredMailResult,
	removeTagFromMail,
	reverseTagToMail,
	toOriginalName,
} from './mailListModel';
import type { MailBodyT, MailRepository, RawMailT, MailT } from './types';
import createRegexSearchIndex from '../search/createRegexSearchIndex';
import { currentTagAtom } from './useTag';
import atomWithAsyncInit from '../hooks/atomWithAsyncInit';
import atomWithLoaded from '../hooks/atomWithLoaded';
import filterTruthy from '../filterTruthy';
import invariant from '../invariant';
import { useCallback } from 'react';

type Mode = 'all' | 'unread' | 'favorite';

export type MailListDefaults = {
	pmList: RawMailT[];
	mailBodyDict: Record<string, MailBodyT>;
	memberNameDict: Record<string, number>;
	tagToMailDict: Record<string, string[]>;
	status: Record<string, boolean | undefined>;
};

export interface MailListResult {
	waitForAll: () => void;
	mailList: (mode: Mode) => MailT[];
	useMailById: (id: string) => MailT | undefined;
	useToOriginalName: () => (member: string) => IZONE | '운영팀';
	useStatus: () => Record<string, boolean | undefined>;
	useCurrentMode: () => [Mode, (mode: Mode) => void];
	useCurrentMailList: () => MailT[];
	useTags: () => {
		useTagToMailDict: () => Record<string, string[]>;
		useIsFavorited: (mailId: string) => boolean;
		useIsUnread: (mailId: string) => boolean;
		useMailTags: (mailId: string) => string[];
		useToggleTagToMail: () => (tag: string, mail: string) => void;
	};
	useSearch: () => [string, (keyword: string) => void];
};

const emptyTagToMailDict = {
	[UNREAD]: [],
	[FAVORITE]: [],
};

export function createUseMailList(mailRepository: MailRepository, defaults?: Partial<MailListDefaults>) {
	const mailBodyDictAtom = atomWithLoaded(defaults?.mailBodyDict ?? {}, mailRepository.getMailBodyDict);
	const nameToNumberDictAtom = atomWithLoaded(defaults?.memberNameDict ?? {}, mailRepository.getMemberNameDict);
	const tagToMailDictAtom = atomWithAsyncInit(
		defaults?.tagToMailDict ?? emptyTagToMailDict,
		mailRepository.getTagToMailDict,
		mailRepository.saveTagToMailDict,
	);
	const statusAtom = atomWithLoaded(defaults?.status ?? {}, mailRepository.status);
	const rawMailListAtom = atomWithLoaded(defaults?.pmList ?? [], mailRepository.getAllMailList);

	const mailToTagDictAtom = atom((get) => reverseTagToMail(get(tagToMailDictAtom)));

	const mailListAtom = atom((get) => {
		const rawMailList = get(rawMailListAtom);
		const mailBodyDict = get(mailBodyDictAtom);
		const nameToNumberDict = get(nameToNumberDictAtom);

		if (
			rawMailList.length === 0 ||
			Object.keys(mailBodyDict).length === 0 ||
			Object.keys(nameToNumberDict).length === 0
		) {
			return [];
		}

		return rawMailList.map((mail) => {
			const mailBody = mailBodyDict[mail.id];
			invariant(mailBody, `mail_body_dict.json 에 ${mail.id} 메일의 body와 images가 없습니다!`);
			return {
				...mail,
				...mailBody,
				images: filterTruthy(mailBody.images),
				bodyText: mailBody.body
					.replaceAll('\n', '')
					.replaceAll('<br>', '\n')
					.replaceAll('<p>', '\n<p>')
					.replace(/<[^>]+>/g, ' ')
					.replaceAll('&nbsp;', ' ')
					.replaceAll('{이미지}', ''),
				member: toOriginalName(nameToNumberDict)(mail.member),
			};
		});
	});

	const unreadAtom = selectAtom(tagToMailDictAtom, (tagToMailDict) => new Set(tagToMailDict[UNREAD]));
	const favoriteAtom = selectAtom(tagToMailDictAtom, (tagToMailDict) => new Set(tagToMailDict[FAVORITE]));

	const useTags = () => {
		return {
			useTagToMailDict() {
				return useAtomValue(tagToMailDictAtom);
			},
			useIsFavorited(mailId: string) {
				return useAtomValue(selectAtom(favoriteAtom, useCallback((favoriteSet) => favoriteSet.has(mailId), [mailId])));
			},
			useIsUnread(mailId: string) {
				return useAtomValue(selectAtom(unreadAtom, useCallback((unreadSet) => unreadSet.has(mailId), [mailId])));
			},
			useMailTags(mailId: string) {
				return useAtomValue(selectAtom(mailToTagDictAtom, useCallback((dict) => dict.get(mailId) ?? [], [mailId])));
			},
			useToggleTagToMail() {
				const setTagToMailDict = useSetAtom(tagToMailDictAtom);

				return (tag: string, targetMailId: string) => {
					setTagToMailDict((tagToMailDict: Record<string, string[]>): Record<string, string[]> => {
						if (tagToMailDict[tag].includes(targetMailId)) {
							return removeTagFromMail(tag, targetMailId)(tagToMailDict);
						}
						return addTagToMail(tag, targetMailId)(tagToMailDict);
					});
				};
			},
		};
	};

	const indexAtom = atom((get) => {
		const mailList = get(mailListAtom);
		return createRegexSearchIndex(
			mailList.map((mail) => ({
				...mail,
				body: mail.body.replace(new RegExp('&nbsp;', 'g'), ' '),
			})),
		);
	});

	const keywordAtom = atom('');

	const filteredMailListAtom = atom((get) => {
		const mailList = get(mailListAtom);
		const index = get(indexAtom);
		const tag = get(currentTagAtom);
		const tagToMailDict = get(tagToMailDictAtom);
		const keyword = get(keywordAtom);
		return getFilteredMailResult(tag, tagToMailDict, mailList, index, keyword);
	});

	const currentModeAtom = atom<Mode>('all');
	const currentMailListAtom = atom((get) => {
		const result = get(filteredMailListAtom);
		const currentMode = get(currentModeAtom);
		return result[currentMode];
	});

	return (): MailListResult => {
		return {
			waitForAll: () => undefined,
			mailList: (mode: Mode) => useAtomValue(filteredMailListAtom)[mode],
			useCurrentMode: () => useAtom(currentModeAtom),
			useCurrentMailList: () => useAtomValue(currentMailListAtom),
			useMailById: (id) => {
				const mailList = useAtomValue(mailListAtom);
				return mailList.find((mail) => mail.id === id);
			},
			useToOriginalName: () => toOriginalName(useAtomValue(nameToNumberDictAtom)),
			useStatus: () => useAtomValue(statusAtom),
			useTags,
			useSearch: () => useAtom(keywordAtom),
		};
	};
}
