import React, { useEffect, useRef, useState } from 'react';

import { strs, useTranslation } from '../i18n/i18n';
import DarkModeButton from './DarkModeButton';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import MenuButton from './MenuButton';
import SelectedTag from './SelectedTag';
import { FormLabel, HStack, TextInput, Text } from './rize-ui-web';
import { useMailList } from '../hooks/Dependencies';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';
import XMarkIcon from './icons/XMarkIcon';
import useNavigation from '../router/useNavigation';
import paths from '../router/paths';
import PhotoIcon from './icons/PhotoIcon';
import { useHotkeys } from 'react-hotkeys-hook';

function AppBar() {
	const [, search] = useMailList().useSearch();
	const [keywordInput, setKeywordInput] = useState('');
	const { Link, navigate } = useNavigation();
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		search(keywordInput);
	}, [keywordInput, search]);

	function handleClose() {
		setIsOpen(false);
	}

	useHotkeys('a', () => {
		navigate(paths.ALBUM);
	});

	useHotkeys('Escape', () => {
		setIsOpen(false);
	}, {
		enableOnFormTags: true
	});

	useHotkeys('/', () => {
		setIsOpen(true);
	});

	const isComposingRef = useRef(false);

	return isOpen ? (
		<HStack className="h-14 bg-base-100 px-2 py-1 border-b-2 border-gray-200 items-center justify-between">
			<FormLabel className="w-full justify-between align-middle items-center">
				<Text className="font-bold w-12">{t(strs.검색)}</Text>
				<TextInput
					type="search"
					name="search"
					size="sm"
					className="w-full"
					value={keywordInput}
					onCompositionStart={()=>{
						isComposingRef.current = true;
					}}
					onCompositionEnd={()=>{
						isComposingRef.current = false;
					}}
					onChange={(e) => {
						if (
							isComposingRef.current 
							|| e.currentTarget.value.length < keywordInput.length
							|| e.currentTarget.value.at(-1) !== e.currentTarget.value.at(-2)
							|| /[가-힇ㄱ-ㅎㅏ-ㅣぁ-ゔァ-ヴー々〆〤一-龥]/.test(e.currentTarget.value.at(-1) ?? '') === false
						){
							setKeywordInput(e.currentTarget.value);
						}
					}}
				/>
			</FormLabel>
			<IconButtonWithTooltip
				onClick={() => {
					handleClose();
				}}
				direction="left"
				size="sm"
				icon={<XMarkIcon />}
				ariaLabel={t(strs.검색창_닫기)}
			/>
		</HStack>
	) : (
		<HStack className="h-14 bg-base-100 p-2 border-b-2 border-gray-200 items-center justify-between">
			<MenuButton />
			<DarkModeButton />
			<SelectedTag />
			<IconButtonWithTooltip
				as={Link}
				to={paths.ALBUM}
				variant="ghost"
				size="sm"
				icon={<PhotoIcon />}
				ariaLabel={t(strs.앨범)+'(a)'}
			/>
			<IconButtonWithTooltip
				onClick={() => {
					setIsOpen(true);
				}}
				direction="bottom"
				size="sm"
				icon={<MagnifyingGlassIcon />}
				ariaLabel={t(strs.검색)+'(/)'}
			/>
		</HStack>
	);
}

export default AppBar;
