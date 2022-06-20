import { SearchIcon } from '@chakra-ui/icons';
import {
  CloseButton,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
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
import LeftDrawler from './LeftDrawler';
import SelectedTag from './SelectedTag';

function AppBar() {
  const [keyword, search] = useAtom(keywordAtom);
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };
  const { isOpen, onClose, onOpen } = useDisclosure();

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
    <HStack padding="2" borderBottom="1px solid #e2e8f0">
      {isOpen ? (
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
          >
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            autoFocus
            type="text"
            placeholder={t(strs.검색하기)}
            htmlSize={16}
            width="90%"
            onKeyUp={handleKeyUp}
            value={keyword}
            onChange={handleChange}
          />
          <InputRightElement>
            <Tooltip label={t(strs.검색창_닫기)}>
              <CloseButton
                h="1.75rem"
                size="sm"
                onClick={handleClose}
                aria-label={t(strs.검색창_닫기)}
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      ) : (
        <>
          <LeftDrawler />
          <DarkModeButton />
          <SelectedTag />
          <IconButtonWithTooltip
            position="absolute"
            right="3"
            onClick={onOpen}
            icon={<SearchIcon />}
            marginLeft="2"
            aria-label={t(strs.검색)}
          />
        </>
      )}
    </HStack>
  );
}

export default AppBar;
