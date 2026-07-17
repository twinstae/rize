import React from 'react';
import { VStack } from '../components/rize-ui-web';
import BottomTabs from '../components/BottomTabs';
import LangConfig from './config/LangConfig';
import NickNameConfig from './config/NickNameConfig';
import ProfileConfig from './config/ProfileConfig';
import TestingButton from './config/TestingButton';
import PlatformConfig from '@rize/PlatformConfig';
import ShortcutConfig from './config/ShortcutConfig';
import { IonHeader, IonToolbar } from '@ionic/react';

const Config = () => {
	return (
		<BottomTabs>
			<IonHeader className="ion-no-border">
				<IonToolbar className="mail-toolbar">
					<div className="flex h-[4.5rem] items-center gap-1 px-3 sm:px-4">
						<div className="min-w-0 flex-1 px-2">
							<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--rize-muted)]">Rize mail</p>
							<div className="mt-0.5 flex items-center gap-2">
								<h1 className="text-lg font-extrabold tracking-tight text-[var(--rize-text)] sm:text-xl">Config</h1>
							</div>
						</div>
					</div>
				</IonToolbar>
			</IonHeader>
			<VStack className="min-h-0 flex-1 gap-4 overflow-y-auto bg-[var(--rize-base-200)] p-4">
				<LangConfig />
				<NickNameConfig />
				<ShortcutConfig />
				<ProfileConfig />
				<PlatformConfig />
				<TestingButton />
			</VStack>
		</BottomTabs>
	);
};

export default Config;
