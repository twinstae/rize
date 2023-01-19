import React, { createContext, useEffect, useId, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTranslation } from '../i18n/i18n';
import { strs } from '../i18n/i18n';
import MemberList from './MemberList';
import paths from '../router/paths';
import useNavigation from '../router/useNavigation';
import XMarkIcon from './icons/XMarkIcon';
import { HStack } from './rize-ui';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import invariant from '../invariant';

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
		'Tab',
		(e) => {
			if (isOpen) {
				invariant(drawerSideRef.current);
				const nodes = drawerSideRef.current.querySelectorAll('*');
				const tabbable = Array.from(nodes).filter((n) => n instanceof HTMLElement && n.tabIndex >= 0) as HTMLElement[];

				let index = document.activeElement ? tabbable.indexOf(document.activeElement as HTMLElement) : -1;
				if (index === -1 && e.shiftKey) index = 0;

				index += tabbable.length + (e.shiftKey ? -1 : 1);
				index %= tabbable.length;

				tabbable[index].focus();
				e.preventDefault();
			}
		},
		[isOpen],
	);
	useHotkeys('Esc', () => handleClose());
	return (
		<div className="drawer bg-base-100 ">
			<input
				checked={isOpen}
				id={drawlerId}
				type="checkbox"
				className="drawer-toggle"
				onChange={(e) => {
					if (e.target.checked) {
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
				<label htmlFor={drawlerId} className="drawer-overlay bg-secondary">
					close drawer
				</label>
				<div className="menu bg-base-100 pl-4 pr-1 w-2/3 relative">
					<HStack className="w-full justify-between">
						<h2 className="p-2 text-xl">{t(strs.메뉴)}</h2>
						<IconButtonWithTooltip
							ref={closeButtonRef}
							onClick={() => handleClose()}
							icon={<XMarkIcon />}
							className="drawer-button right-0 top-0 p-0 focus:border-2 focus:border-primary"
							direction="bottom"
							circle="circle"
							aria-label={t(strs.닫기)}
						/>
					</HStack>
					<MemberList />
					<div id="to-config">
						<Link to={paths.CONFIG} className="mt-4 btn btn-primary btn-sm">
							{t(strs.설정)}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LeftDrawler;
