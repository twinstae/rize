import createRegexSearchIndex from 'src/search/createRegexSearchIndex';
import { MEMBER_LIST } from '../constants';
import { HITOMI_MAIL, YURI_MAIL_M25752 } from '../test/fixtures';
import fakeMailRepository from './fakeMailRepository';
import {
	addTagToMail,
	getFilteredMailResult,
	removeTagFromMail,
	reverseTagToMail,
	toOriginalName,
} from './mailListModel';
import { MailT } from './types';
import { FAVORITE, UNREAD } from './useMailList';

const tagToMailDict = {
	tag1: ['mail1', 'mail2'],
	조유리: ['mail1', 'mail3'],
	[UNREAD]: ['mail3'],
	[FAVORITE]: ['mail1', 'mail2'],
};

it('reverseTagToMail', () => {
	const result = reverseTagToMail(tagToMailDict);

	expect(result.get('mail1')).toEqual(['tag1', '조유리', FAVORITE]);
	expect(result.get('mail2')).toEqual(['tag1', FAVORITE]);
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

const READ_FAVORITED_YURI_MAIL1: MailT = {
	...YURI_MAIL_M25752,
	id: 'mail1',
};

const READ_FAVORITED_HITOMI_MAIL2: MailT = {
	...HITOMI_MAIL,
	id: 'mail2',
};

const UNREAD_UNFAVORITED_YURI_MAIL3: MailT = {
	...YURI_MAIL_M25752,
	id: 'mail3',
};

const testSuites: [
	string,
	[string, string],
	{
		all: MailT[];
		favorite: MailT[];
		unread: MailT[];
	},
][] = [
	[
		'both keyword and tag',
		['유리입니다', 'tag1'],
		{
			all: [READ_FAVORITED_YURI_MAIL1],
			favorite: [READ_FAVORITED_YURI_MAIL1],
			unread: [],
		},
	],
	[
		'only by tag',
		['', 'tag1'],
		{
			all: [READ_FAVORITED_YURI_MAIL1, READ_FAVORITED_HITOMI_MAIL2],
			favorite: [READ_FAVORITED_YURI_MAIL1, READ_FAVORITED_HITOMI_MAIL2],
			unread: [],
		},
	],
	[
		'empty tag',
		['', ''],
		{
			all: [READ_FAVORITED_YURI_MAIL1, READ_FAVORITED_HITOMI_MAIL2, UNREAD_UNFAVORITED_YURI_MAIL3],
			favorite: [READ_FAVORITED_YURI_MAIL1, READ_FAVORITED_HITOMI_MAIL2],
			unread: [UNREAD_UNFAVORITED_YURI_MAIL3],
		},
	],
	[
		'by member tag',
		['', '조유리'],
		{
			all: [READ_FAVORITED_YURI_MAIL1, UNREAD_UNFAVORITED_YURI_MAIL3],
			favorite: [READ_FAVORITED_YURI_MAIL1],
			unread: [UNREAD_UNFAVORITED_YURI_MAIL3],
		},
	],
	[
		'only by keyword',
		['유리입니다', ''],
		{
			all: [READ_FAVORITED_YURI_MAIL1, UNREAD_UNFAVORITED_YURI_MAIL3],
			favorite: [READ_FAVORITED_YURI_MAIL1],
			unread: [UNREAD_UNFAVORITED_YURI_MAIL3],
		},
	],
	['all', ['all', ''], { all: [], favorite: [], unread: [] }],
];

testSuites.forEach(([label, [keyword, tag], expected]) => {
	it(label, () => {
		const MAIL_LIST = [READ_FAVORITED_YURI_MAIL1, READ_FAVORITED_HITOMI_MAIL2, UNREAD_UNFAVORITED_YURI_MAIL3];
		const index = createRegexSearchIndex(MAIL_LIST);
		const result = getFilteredMailResult(tag, tagToMailDict, MAIL_LIST, index, keyword);

		expect(result).toEqual(expected);
	});
});

MEMBER_LIST.forEach((member) => {
	it(`toOriginalName: ${member}`, async () => {
		const memberNameDict = await fakeMailRepository.getMemberNameDict();
		expect(toOriginalName(memberNameDict)(member)).toBe(member);
	});
});
