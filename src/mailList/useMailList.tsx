import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { atomWithSuspenseQuery } from 'jotai-tanstack-query';

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
import filterTruthy from '../filterTruthy';
import invariant from '../invariant';
import { useCallback } from 'react';

type Mode = 'all' | 'unread' | 'favorite';

export interface MailListResult {
	waitForAll: () => void;
	mailList: (mode: Mode) => MailT[];
	useMailById: (id: string) => MailT | undefined;
	useToOriginalName: () => (member: string) => IZONE | '운영팀';
	useStatus: () => { [fileName: string]: boolean | undefined };
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
}


export function createUseMailList(mailRepository: MailRepository) {
	const mailBodyDictAtom = atomWithSuspenseQuery(() => ({
		queryKey: ['mail_body_dict.json'],
		queryFn: mailRepository.getMailBodyDict
	}));

	const nameToNumberDictAtom = atomWithSuspenseQuery(() => ({
		queryKey: ['member_name.json'],
		queryFn: mailRepository.getMemberNameDict,
	}));

	const tagToMailDictAtom = atomWithAsyncInit(
		{
			[UNREAD]: [],
			[FAVORITE]: [],
		},
		mailRepository.getTagToMailDict,
		mailRepository.saveTagToMailDict,
	);

	const statusAtom = atomWithSuspenseQuery(() => ({
		queryKey: ['status'],
		queryFn: async () => mailRepository.status(),
	}));

	const mailToTagDictAtom = atom((get) => reverseTagToMail(get(tagToMailDictAtom)));
	const rawMailListAtom = atomWithSuspenseQuery(() => ({
		queryKey: ['pm_list.json'],
		queryFn: mailRepository.getAllMailList,
	}));

	const mailListAtom = atom<Promise<(RawMailT & MailBodyT & { member: IZONE | '운영팀'; bodyText: string })[]>>(async (get) => {
		const { data: rawMailList } = await get(rawMailListAtom);
		const { data: mailBodyDict } = await get(mailBodyDictAtom);
		const { data: nameToNumberDict } = await get(nameToNumberDictAtom);
		return (
			rawMailList?.map((mail) => {
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
			}) || []
		);
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
				return useAtomValue(selectAtom(mailToTagDictAtom, useCallback((dict) =>  dict.get(mailId) ?? [], [mailId])));
			},
			useToggleTagToMail() {
				const setTagToMailDict = useSetAtom(tagToMailDictAtom);
				
				return (tag: string, targetMailId: string) => {
					setTagToMailDict((tagToMailDict: Record<string, string[]>): Record<string, string[]> => {
						if (tagToMailDict[tag].includes(targetMailId)){
							return removeTagFromMail(tag, targetMailId)(tagToMailDict);
						} else {
							return addTagToMail(tag, targetMailId)(tagToMailDict);
						}
					});
				};
			},
		};
	};

	const indexAtom = atom(async (get) =>{
		const mailList = await get(mailListAtom)

		return createRegexSearchIndex(
			mailList.map((mail) => ({
				...mail,
				body: mail.body.replace(new RegExp('&nbsp;', 'g'), ' '),
			})),
		)
	}
	);

	const keywordAtom = atom('');

	const filtertedMailListAtom = atom(async (get) => {
		const mailList = await get(mailListAtom);
		const index = await get(indexAtom);
		const tag = get(currentTagAtom);
		const tagToMailDict = get(tagToMailDictAtom);
		const keyword = get(keywordAtom);
		return getFilteredMailResult(tag, tagToMailDict, mailList, index, keyword);
	});

	const currentModeAtom = atom<'all' | 'unread' | 'favorite'>('all');
	const currentMailListAtom = atom(async (get) => {
		const result = await get(filtertedMailListAtom);
		const currentMode = get(currentModeAtom);
		return result[currentMode];
	});
	const allAtom = atom((get) => Promise.all([get(statusAtom), get(filtertedMailListAtom)]));
	return (): MailListResult => {
		return {
			waitForAll: () => {
				useAtomValue(allAtom);
			},
			mailList: (mode: 'all' | 'unread' | 'favorite') => {
				
				const filtertedMailList = useAtomValue(filtertedMailListAtom);
				return filtertedMailList[mode];
			},
			useCurrentMode: () => useAtom(currentModeAtom),
			useCurrentMailList: () => useAtomValue(currentMailListAtom),
			useMailById: (id) => {
				const mailList = useAtomValue(mailListAtom);
				return mailList.find((mail) => mail.id === id);
			},
			useToOriginalName: () => {
				const { data: nameToNumber } = useAtomValue(nameToNumberDictAtom);
				return toOriginalName(nameToNumber);
			},
			useStatus: () => useAtomValue(statusAtom).data,
			useTags,
			useSearch: () => useAtom(keywordAtom),
		};
	};
}
