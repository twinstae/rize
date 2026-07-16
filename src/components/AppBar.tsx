import React, { useEffect, useState } from 'react';
import { IonHeader, IonSearchbar, IonToolbar } from '@ionic/react';

import { strs, useTranslation } from '../i18n/i18n';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import MenuButton from './MenuButton';
import SelectedTag from './SelectedTag';
import { useMailList } from '../hooks/Dependencies';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';
import XMarkIcon from './icons/XMarkIcon';
import useNavigation from '../router/useNavigation';
import paths from '../router/paths';
import PhotoIcon from './icons/PhotoIcon';
import { useHotkeys } from 'react-hotkeys-hook';

function AppBar() {
	const [initKeyword, search] = useMailList().useSearch();
	const [keywordInput, setKeywordInput] = useState(initKeyword);
	const { Link, navigate, current } = useNavigation();
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		search(keywordInput);
	}, [keywordInput, search]);

	function close() {
		setIsOpen(false);
	}
	function open() {
		setIsOpen(true);
	}

	useHotkeys('a', () => {
		navigate(paths.ALBUM);
	});

	useHotkeys(
		'Escape',
		() => {
			close();
		},
		{
			enableOnFormTags: true,
		}
	);

	useHotkeys('/', (e) => {
		e.preventDefault();
		open();
	});

	return isOpen ? (
		<IonHeader className="ion-no-border">
			<IonToolbar className="mail-toolbar">
				<div className="flex h-20 items-center gap-2 px-3">
					<IonSearchbar
						aria-label={t(strs.검색)}
						className="mail-searchbar"
						debounce={0}
						placeholder={t(strs.검색)}
						value={keywordInput}
						onIonInput={(event) => setKeywordInput(event.detail.value ?? '')}
						autoFocus
					/>
					<IconButtonWithTooltip
						onClick={close}
						direction="left"
						size="sm"
						icon={<XMarkIcon />}
						ariaLabel={t(strs.검색창_닫기)}
					/>
				</div>
			</IonToolbar>
		</IonHeader>
	) : (
		<IonHeader className="ion-no-border">
			<IonToolbar className="mail-toolbar">
				<div className="flex h-20 items-center gap-2 px-3 sm:px-5">
					<MenuButton />
					<div className="min-w-0 flex-1 px-1">
						<p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--rize-muted)]">
							Rize mail
						</p>
						<div className="flex items-center gap-2">
							<h1 className="text-xl font-extrabold tracking-tight text-[var(--rize-text)]">Messages</h1>
							<SelectedTag />
						</div>
					</div>
					{current() === paths.MAIL_LIST && (
						<IconButtonWithTooltip
							as={Link}
							to={paths.ALBUM}
							variant="ghost"
							size="sm"
							icon={<PhotoIcon />}
							ariaLabel={t(strs.앨범) + '(a)'}
						/>
					)}
					<IconButtonWithTooltip
						onClick={open}
						direction="bottom"
						size="sm"
						icon={<MagnifyingGlassIcon />}
						ariaLabel={t(strs.검색) + '(/)'}
					/>
				</div>
			</IonToolbar>
		</IonHeader>
	);
}

export default AppBar;
