import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  HStack,
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

function AppBar() {
  const [keyword, search] = useAtom(keywordAtom);
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };
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
    <HStack padding="2" borderBottom="1px solid #e2e8f0" className="bg-base-100">
      {isOpen ? (
        <InputGroup>
          <input
            autoFocus
            type="text"
            className="input input-bordered input-xs p-1 w-8/10 m-1 rounded"
            placeholder={t(strs.검색하기)}
            onKeyUp={handleKeyUp}
            value={keyword}
            onChange={handleChange}
          />
          <InputRightElement>
            <Tooltip label={t(strs.검색창_닫기)}>
              <IconButtonWithTooltip
                {...getButtonProps()}
                aria-label={t(strs.검색창_닫기)}
                icon={<CloseIcon />}
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
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
