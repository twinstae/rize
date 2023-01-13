
import React, { useEffect, useState } from 'react';

import { strs, useTranslation } from '../i18n/i18n';
import DarkModeButton from './DarkModeButton';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import MenuButton from './MenuButton';
import SelectedTag from './SelectedTag';
import { HStack } from './rize-ui';
import { useMailList } from '../hooks/Dependencies';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';
import XMarkIcon from './icons/XMarkIcon';
import useNavigation from '../router/useNavigation';
import paths from '../router/paths';
import PhotoIcon from './icons/PhotoIcon';
import { Tooltip } from './Tooltip';

function AppBar() {
  const [keyword, search] = useMailList().useSearch();
  const [keywordInput, setKeywordInput] = useState('');
  const { Link } = useNavigation();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    search(keywordInput);
  }, [keywordInput, search]);

  function handleClose() {
    setIsOpen(false);
    setKeywordInput('');
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }

  useEffect(() => {
    if (keyword) {
      setIsOpen(true);
    }
    return () => handleClose();
  }, []);

  return (isOpen ? (
    <HStack className="h-14 bg-base-100 px-2 py-1 border-b-2 border-gray-200 items-center justify-between">
      <label htmlFor="search-bar" className="flex flex-row justify-between align-middle items-center">
        <span className="p-2 font-bold">{t(strs.검색)}</span>
      </label>
      <input
        id="search-bar"
        autoFocus
        type="text"
        className="flex-1 input input-bordered input-sm p-1 rounded"
        placeholder={t(strs.검색하기)}
        onKeyUp={handleKeyUp}
        value={keywordInput}
        onChange={(e) => {
          setKeywordInput(e.target.value);
        }}
      />
      <IconButtonWithTooltip
        onClick={() => {
          handleClose();
        }}
        className="tooltip-bottom"
        aria-label={t(strs.닫기)}
        icon={<XMarkIcon />}
      />
    </HStack>
  ) : (
    <HStack className="h-14 bg-base-100 p-2 border-b-2 border-gray-200 items-center justify-between">
      <MenuButton />
      <DarkModeButton />
      <SelectedTag />
      <Tooltip tip={t(strs.앨범)} className="tooltip-bottom">
        <Link to={paths.ALBUM} className="btn btn-ghost btn-sm">
          <PhotoIcon aria-label={t(strs.앨범)} />
        </Link>
      </Tooltip>
      <IconButtonWithTooltip
        onClick={() => {
          setIsOpen(true);          
        }}
        className="ml-2 tooltip-bottom"
        icon={<MagnifyingGlassIcon />}
        aria-label={t(strs.검색)}
      />
    </HStack>
  )
  );
}

export default AppBar;
