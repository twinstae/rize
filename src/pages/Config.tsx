import { VStack, HStack } from '../components/rize-ui';
import React from 'react';

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
				<ProfileConfig />
				<TestingButton />
			</VStack>
		</VStack>
	);
};

export default Config;
