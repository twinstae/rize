export const MEMBER_LIST = [
	'권은비',
	'미야와키 사쿠라',
	'강혜원',
	'최예나',
	'이채연',
	'김채원',
	'김민주',
	'야부키 나코',
	'혼다 히토미',
	'조유리',
	'안유진',
	'장원영',
] as const;

export type IZONE = typeof MEMBER_LIST[number];

export const memberNameDict: Record<number, IZONE | '운영팀'> = {
	0: '장원영',
	1: '미야와키 사쿠라',
	2: '조유리',
	3: '최예나',
	4: '안유진',
	5: '야부키 나코',
	6: '권은비',
	7: '강혜원',
	8: '혼다 히토미',
	9: '김채원',
	10: '김민주',
	11: '이채연',
	12: '운영팀',
};
