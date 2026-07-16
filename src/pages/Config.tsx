import React from 'react';
import { VStack } from '../components/rize-ui-web';
import AppBar from '../components/AppBar';
import BackButton from '../components/BackButton';
import LeftDrawler from '../components/LeftDrawer';
import LangConfig from './config/LangConfig';
import NickNameConfig from './config/NickNameConfig';
import ProfileConfig from './config/ProfileConfig';
import TestingButton from './config/TestingButton';
import PlatformConfig from '@rize/PlatformConfig';
import ShortcutConfig from './config/ShortcutConfig';

const Config = () => {
	return (
		<LeftDrawler>
			<AppBar />
			<VStack className="gap-4 bg-[var(--rize-base-200)] p-4">
				<LangConfig />
				<NickNameConfig />
				<ShortcutConfig />
				<ProfileConfig />
				<PlatformConfig />
				<TestingButton />
			</VStack>
			<BackButton
				direction="top"
				variant="primary"
				circle="circle"
				size="base"
				className="absolute bottom-6 right-4"
			/>
		</LeftDrawler>
	);
};

export default Config;
