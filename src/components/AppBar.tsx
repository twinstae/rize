import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  InputGroup,
  InputRightElement,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { strs } from '../i18n/i18n';
import { keywordAtom } from '../search/useSearch';
import DarkModeButton from './DarkModeButton';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import MenuButton from './MenuButton';
import SelectedTag from './SelectedTag';
import { HStack } from './rize-ui';

function AppBar() {
  const [keyword, search] = useAtom(keywordAtom);
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen, getButtonProps } = useDisclosure();

  function handleClose() {
    onClose();
    search('');
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
    <HStack className="bg-base-100 p-2">
      {isOpen ? (
        <label className="flex flex-row justify-between">
          <span>검색</span>
          <input
            autoFocus
            type="text"
            className="input input-bordered input-xs p-1 w-8/10 m-1 rounded"
            placeholder={t(strs.검색하기) ?? ''}
            onKeyUp={handleKeyUp}
            value={keyword}
            onChange={(e) => {
              search(e.target.value);
            }}
          />
          <IconButtonWithTooltip
            {...getButtonProps()}
            aria-label={t(strs.검색창_닫기)}
            icon={<CloseIcon />}
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
            icon={<SearchIcon />}
            aria-label={t(strs.검색)}
          />
        </>
      )}
    </HStack>
  );
}

export default AppBar;
