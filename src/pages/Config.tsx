import React from 'react';
import { VStack } from '../components/rize-ui-web';
import BackButton from '../components/BackButton';
import LangConfig from './config/LangConfig';
import NickNameConfig from './config/NickNameConfig';
import ProfileConfig from './config/ProfileConfig';
import TestingButton from './config/TestingButton';
import PlatformConfig from '@rize/PlatformConfig';
import ShortcutConfig from './config/ShortcutConfig';
import { IonHeader, IonToolbar } from '@ionic/react';

const Config = () => {
	return (
		<>
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
			<VStack className="gap-4 bg-[var(--rize-base-200)] p-4 h-[calc(100dvh-6rem)] overflow-y-auto">
				<LangConfig />
				<NickNameConfig />
				<ShortcutConfig />
				<ProfileConfig />
				<PlatformConfig />
				<TestingButton />
			</VStack>
			<BackButton direction="top" variant="primary" circle="circle" size="base" className="absolute bottom-6 right-4" />
		</>
	);
};

export default Config;
