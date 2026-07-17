import React from 'react';
import { IonIcon, IonLabel, IonTab, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { images, mail, settings } from 'ionicons/icons';

import paths from '../router/paths';
import useNavigation from '../router/useNavigation';
import { strs, useTranslation } from '../i18n/i18n';
import { rem } from '../theme/rem';
import { cn } from '../utils/cn';

export const BOTTOM_TAB_BAR_HEIGHT = rem(3.5);

const TAB_MAIL = 'mail';
const TAB_ALBUM = 'album';
const TAB_CONFIG = 'config';

type BottomTabsProps = {
	children: React.ReactNode;
	className?: string;
};



function BottomTabs({ children, className }: BottomTabsProps) {
	const { current, navigate } = useNavigation();
	const { t } = useTranslation();

	const activePage = current();
	const selectedTab =
		activePage === paths.ALBUM ? TAB_ALBUM : activePage === paths.CONFIG ? TAB_CONFIG : TAB_MAIL;

	function selectTab(tab: typeof TAB_MAIL | typeof TAB_ALBUM | typeof TAB_CONFIG) {
		const path =
			tab === TAB_ALBUM ? paths.ALBUM : tab === TAB_CONFIG ? paths.CONFIG : paths.MAIL_LIST;
		if (activePage !== path) {
			navigate(path);
		}
	}

	return (
		<IonTabs className={cn('mail-bottom-tabs flex min-h-dvh flex-col', className)}>
			<IonTab tab={selectedTab}>{children}</IonTab>
			<IonTabBar slot="bottom" selectedTab={selectedTab} className="mail-tab-bar">
				<IonTabButton tab={TAB_MAIL} onClick={() => selectTab(TAB_MAIL)}>
					<IonIcon icon={mail} />
					<IonLabel>{t(strs.메일)}</IonLabel>
				</IonTabButton>
				<IonTabButton tab={TAB_ALBUM} onClick={() => selectTab(TAB_ALBUM)}>
					<IonIcon icon={images} />
					<IonLabel>{t(strs.앨범)}</IonLabel>
				</IonTabButton>
				<IonTabButton tab={TAB_CONFIG} onClick={() => selectTab(TAB_CONFIG)}>
					<IonIcon icon={settings} />
					<IonLabel>{t(strs.설정)}</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
}

export default BottomTabs;
