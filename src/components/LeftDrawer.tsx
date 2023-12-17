import React, { createContext, useEffect, useId, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from '../i18n/i18n';
import { strs } from '../i18n/i18n';
import MemberList from './MemberList';
import paths from '../router/paths';
import useNavigation from '../router/useNavigation';
import XMarkIcon from './icons/XMarkIcon';
import { HStack } from './rize-ui-web';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import invariant from '../invariant';
import focusLock from '../hooks/focusLock';

type DrawerContextT = {
	handleOpen: () => void;
};

export const drawlerContext = createContext<DrawerContextT>({} as DrawerContextT);

function LeftDrawler({ children }: { children: React.ReactNode }) {
	const { t } = useTranslation();
	const { Link } = useNavigation();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const drawerSideRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const lastFocusedRef = useRef<HTMLElement>();
	const drawlerId = useId();
	function handleClose() {
		setIsOpen(false);
	}
	function handleOpen() {
		if (document.activeElement instanceof HTMLElement) {
			lastFocusedRef.current = document.activeElement;
		}
		setIsOpen(true);
	}
	useEffect(() => {
		if (isOpen) {
			closeButtonRef.current?.focus();
		} else {
			lastFocusedRef.current?.focus();
		}
	}, [isOpen]);
	useHotkeys(
		'Tab, Shift+Tab',
		(e) => {
			if (isOpen){
				invariant(drawerSideRef.current);
				focusLock(drawerSideRef.current, e);
				e.preventDefault();
			}
		},
		[isOpen],
	);
	useHotkeys('Esc', () => handleClose());
	return (
		<div className="drawer bg-base-100">
			<input
				checked={isOpen}
				id={drawlerId}
				type="checkbox"
				className="drawer-toggle"
				onChange={(e) => {
					if (e.currentTarget.checked) {
						handleOpen();
					} else {
						handleClose();
					}
				}}
				tabIndex={-1}
			/>
			<div className="drawer-content overflow-x-hidden">
				<drawlerContext.Provider value={{ handleOpen }}>{children}</drawlerContext.Provider>
			</div>
			<div ref={drawerSideRef} className="drawer-side">
				<label htmlFor={drawlerId} className="drawer-overlay sr-only">
					close drawer
				</label>
				<div className="menu bg-base-100 pl-4 pr-1 w-2/3 relative  h-screen">
					<HStack className="w-full justify-between">
						<h2 className="p-2 text-xl">{t(strs.메뉴)}</h2>
						<IconButtonWithTooltip
							ref={closeButtonRef}
							onClick={() => handleClose()}
							icon={<XMarkIcon />}
							className="drawer-button right-0 top-0 p-0 focus:border-2 focus:border-primary"
							direction="bottom"
							circle="circle"
							ariaLabel={t(strs.닫기)+'(Esc)'}
							tabIndex={isOpen ? undefined : -1}
						/>
					</HStack>
					<MemberList />
					<div id="to-config">
						<Link to={paths.CONFIG} className="mt-4 btn btn-primary btn-sm"  tabIndex={isOpen ? undefined : -1}>
							{t(strs.설정)}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LeftDrawler;
