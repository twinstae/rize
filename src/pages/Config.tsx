import React from 'react';

import { VStack, HStack, KBD } from '../components/rize-ui';
import BackButton from '../components/BackButton';
import DarkModeButton from '../components/DarkModeButton';
import LangConfig from './config/LangConfig';
import NickNameConfig from './config/NickNameConfig';
import ProfileConfig from './config/ProfileConfig';
import TestingButton from './config/TestingButton';
const Config = () => {
	return (
		<VStack className="bg-base-100">
			<HStack className="navbar bg-base-100">
				<BackButton />
				<DarkModeButton />
			</HStack>
			<VStack className="gap-4 p-1">
				<LangConfig />
				<NickNameConfig />
				<VStack className="card bg-base-100 ring-1 ring-slate-300 shadow-md p-4 text-xl">
					<li className="list-none"><KBD>/</KBD>: 검색</li>
					<li className="list-none"><KBD>Esc</KBD>: 검색 창 닫기</li>
					<li className="list-none"><KBD> ← Backspace</KBD>: 뒤로가기</li>
					<li className="list-none"><KBD>a</KBD>: 앨범</li>
					<li className="list-none"><KBD>d</KBD>: 다크 테마 전환</li>
					<li className="list-none"><KBD>f</KBD>: 중요</li>
					<li className="list-none"><KBD>j</KBD>: 다음 메일</li>
					<li className="list-none"><KBD>k</KBD>: 이전 메일</li>
				</VStack>
				<ProfileConfig />
				<TestingButton />
			</VStack>
		</VStack>
	);
};

export default Config;
