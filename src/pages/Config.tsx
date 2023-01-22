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
		<VStack className="bg-base-100">
			<HStack className="navbar bg-base-100">
				<BackButton />
				<DarkModeButton />
			</HStack>
			<VStack className="gap-4 p-1">
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
