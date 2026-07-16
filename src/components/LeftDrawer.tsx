import React, { createContext, useEffect, useRef, useState } from 'react';
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
	const lastFocusedRef = useRef<HTMLElement | null>(null);
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
			if (isOpen) {
				invariant(drawerSideRef.current);
				focusLock(drawerSideRef.current, e);
				e.preventDefault();
			}
		},
		[isOpen],
	);
	useHotkeys('Esc', () => handleClose());
	return (
		<div className="min-h-dvh bg-base-100">
			<div className="min-w-0 overflow-x-hidden">
				<drawlerContext.Provider value={{ handleOpen }}>{children}</drawlerContext.Provider>
			</div>
			<div
				className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}
				aria-hidden={!isOpen}
			>
				<button
					type="button"
					aria-label="close drawer"
					tabIndex={isOpen ? 0 : -1}
					className={`absolute inset-0 bg-slate-950/40 backdrop-blur-[3px] transition-opacity ${
						isOpen ? 'opacity-100' : 'opacity-0'
					}`}
					onClick={handleClose}
				/>
				<div
					ref={drawerSideRef}
					className={`absolute inset-y-0 left-0 flex w-[min(84vw,23rem)] flex-col bg-base-100 shadow-2xl transition-transform duration-300 ${
						isOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<div className="border-b border-[var(--rize-border)] px-5 pb-4 pt-5">
						<HStack className="w-full items-center justify-between">
							<div>
								<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--rize-muted)]">
									Rize mail
								</p>
								<h2 className="mt-0.5 text-xl font-extrabold text-[var(--rize-text)]">
									{t(strs.메뉴)}
								</h2>
							</div>
							<IconButtonWithTooltip
								ref={closeButtonRef}
								onClick={() => handleClose()}
								icon={<XMarkIcon />}
								direction="bottom"
								circle="circle"
								size="sm"
								ariaLabel={t(strs.닫기) + '(Esc)'}
								tabIndex={isOpen ? undefined : -1}
							/>
						</HStack>
					</div>
					<div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
						<MemberList />
					</div>
					<div id="to-config" className="border-t border-[var(--rize-border)] p-4">
						<Link
							to={paths.CONFIG}
							className="flex min-h-12 items-center justify-center rounded-2xl bg-pink-500 px-4 text-sm font-bold text-white shadow-[var(--rize-shadow-sm)] transition hover:bg-pink-600"
							tabIndex={isOpen ? undefined : -1}
						>
							{t(strs.설정)}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LeftDrawler;
