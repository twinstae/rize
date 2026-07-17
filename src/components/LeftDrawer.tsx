import React, { useEffect } from 'react';
import { IonApp, IonContent, IonMenu } from '@ionic/react';
import { useTranslation } from '../i18n/i18n';
import { strs } from '../i18n/i18n';
import MemberList from './MemberList';
import XMarkIcon from './icons/XMarkIcon';
import { HStack } from './rize-ui-web';
import IconButtonWithTooltip from './IconButtonWithTooltip';

export const LEFT_MENU_ID = 'left-menu';
export const MAIN_CONTENT_ID = 'main-content';

function getLeftMenu() {
	return document.querySelector(`ion-menu[menu-id="${LEFT_MENU_ID}"]`) as HTMLIonMenuElement | null;
}

export function openLeftMenu() {
	const menu = getLeftMenu();
	return menu?.open();
}

export function closeLeftMenu() {
	const menu = getLeftMenu();
	return menu?.close();
}

export function LeftMenu() {
	const { t } = useTranslation();

	function closeMenu() {
		void closeLeftMenu();
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') {
				return;
			}
			const menu = getLeftMenu();
			if (!menu?.isOpen) {
				return;
			}
			event.preventDefault();
			void closeLeftMenu();
		};

		window.addEventListener('keydown', handleKeyDown, true);
		return () => window.removeEventListener('keydown', handleKeyDown, true);
	}, []);

	return (
		<IonMenu menuId={LEFT_MENU_ID} contentId={MAIN_CONTENT_ID} type="overlay" className="mail-menu">
			<IonContent className="mail-menu-content">
				<div className="flex h-full flex-col bg-base-100">
					<div className="border-b border-[var(--rize-border)] px-5 pb-4 pt-5">
						<HStack className="w-full items-center justify-between">
							<div>
								<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--rize-muted)]">
									Rize mail
								</p>
								<h2 className="mt-0.5 text-xl font-extrabold text-[var(--rize-text)]">{t(strs.메뉴)}</h2>
							</div>
							<IconButtonWithTooltip
								onClick={closeMenu}
								onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
									if (event.key === 'Escape') {
										event.preventDefault();
										closeMenu();
									}
								}}
								icon={<XMarkIcon />}
								direction="bottom"
								circle="circle"
								size="sm"
								ariaLabel={t(strs.닫기) + '(Esc)'}
							/>
						</HStack>
					</div>
					<div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
						<MemberList />
					</div>
				</div>
			</IonContent>
		</IonMenu>
	);
}

/** Storybook / tests without page routes */
export function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<IonApp className="bg-base-100">
			<LeftMenu />
			<div id={MAIN_CONTENT_ID} className="mail-main-content min-h-dvh min-w-0 overflow-x-hidden bg-base-100">
				{children}
			</div>
		</IonApp>
	);
}

export default AppShell;
