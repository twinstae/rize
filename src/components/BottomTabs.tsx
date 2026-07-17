import React from 'react';
import { IonIcon, IonLabel, IonTab, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { images, mail } from 'ionicons/icons';

import paths from '../router/paths';
import useNavigation from '../router/useNavigation';
import { strs, useTranslation } from '../i18n/i18n';
import { rem } from '../theme/rem';
import { cn } from '../utils/cn';

export const BOTTOM_TAB_BAR_HEIGHT = rem(3.5);

const TAB_MAIL = 'mail';
const TAB_ALBUM = 'album';

type BottomTabsProps = {
	children: React.ReactNode;
	className?: string;
};

function BottomTabs({ children, className }: BottomTabsProps) {
	const { current, redirect } = useNavigation();
	const { t } = useTranslation();

	const activePage = current();
	const selectedTab = activePage === paths.ALBUM ? TAB_ALBUM : TAB_MAIL;

	function selectTab(tab: typeof TAB_MAIL | typeof TAB_ALBUM) {
		const path = tab === TAB_ALBUM ? paths.ALBUM : paths.MAIL_LIST;
		if (activePage !== path) {
			redirect(path);
		}
	}

	return (
		<IonTabs className={cn('mail-bottom-tabs flex min-h-dvh flex-col', className)}>
			<IonTab tab={selectedTab}>{children}</IonTab>
			<IonTabBar slot="bottom" selectedTab={selectedTab} className="mail-tab-bar">
				<IonTabButton tab={TAB_MAIL} onClick={() => selectTab(TAB_MAIL)}>
					<IonIcon icon={mail} />
					<IonLabel>Messages</IonLabel>
				</IonTabButton>
				<IonTabButton tab={TAB_ALBUM} onClick={() => selectTab(TAB_ALBUM)}>
					<IonIcon icon={images} />
					<IonLabel>{t(strs.앨범)}</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
}

export default BottomTabs;
