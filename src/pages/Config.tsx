import React from 'react';
import { VStack, HStack } from '../components/rize-ui-web';
import BackButton from '../components/BackButton';
import DarkModeButton from '../components/DarkModeButton';
import LangConfig from './config/LangConfig';
import NickNameConfig from './config/NickNameConfig';
import ProfileConfig from './config/ProfileConfig';
import TestingButton from './config/TestingButton';
import PlatformConfig from '@rize/PlatformConfig';
import ShortcutConfig from './config/ShortcutConfig';

const Config = () => {
	return (
		<VStack className="min-h-dvh bg-[var(--rize-base-200)]">
			<HStack className="sticky top-0 z-10 items-center gap-1 border-b border-[var(--rize-border)] bg-base-100 px-3 py-2">
				<BackButton />
				<h1 className="flex-1 text-base font-bold text-[var(--rize-text)]">설정</h1>
				<DarkModeButton />
			</HStack>
			<VStack className="gap-4 p-4">
				<LangConfig />
				<NickNameConfig />
				<ShortcutConfig />
				<ProfileConfig />
				<PlatformConfig />
				<TestingButton />
			</VStack>
		</VStack>
	);
};

export default Config;
