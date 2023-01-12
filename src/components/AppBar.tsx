import {
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { strs } from '../i18n/i18n';
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

function AppBar() {
  const [keyword, search] = useMailList().useSearch();
  const [keywordInput, setKeywordInput] = useState('');
  const { Link } = useNavigation();
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen, getButtonProps } = useDisclosure();

  useEffect(() => {
    const id = setTimeout(() => {
      search(keywordInput);
    }, 500);

    return () => clearTimeout(id);
  }, [keywordInput, search]);

  function handleClose() {
    onClose();
    setKeywordInput('');
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }

  useEffect(() => {
    if (keyword) {
      onOpen();
    }
    return () => handleClose();
  }, []);

  return (
    <HStack className="bg-base-100 p-2 border-b-2 border-gray-200">
      {isOpen ? (
        <label className="w-full flex flex-row justify-between align-middle items-center">
          <span>검색</span>
          <input
            autoFocus
            type="text"
            className="input input-bordered input-xs p-1 w-8/12 m-1 rounded"
            placeholder={t(strs.검색하기) ?? ''}
            onKeyUp={handleKeyUp}
            value={keywordInput}
            onChange={(e) => {
              setKeywordInput(e.target.value);
            }}
          />
          <IconButtonWithTooltip
            {...getButtonProps()}
            aria-label={t(strs.검색창_닫기)}
            icon={<XMarkIcon />}
          />
        </label>
      ) : (
        <>
          <MenuButton />
          <DarkModeButton />
          <SelectedTag />
          <IconButtonWithTooltip
            className="ml-2 tooltip-bottom"
            {...getButtonProps()}
            icon={<MagnifyingGlassIcon />}
            aria-label={t(strs.검색)}
          />
          <Link to={paths.ALBUM} className="btn btn-ghost btn-sm">
            앨범
          </Link>
        </>
      )}
    </HStack>
  );
}

export default AppBar;
