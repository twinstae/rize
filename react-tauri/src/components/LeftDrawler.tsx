import { CloseIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { strs } from '../i18n/i18n';
import paths from '../router/paths';
import useNavigation from '../router/useNavigation';
import MemberList from './MemberList';

function LeftDrawler() {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  return (
    <>
      <Tooltip label={t(strs.메뉴)}>
        <IconButton
          variant="ghost"
          onClick={onOpen}
          ref={btnRef}
          icon={<HamburgerIcon />}
          aria-label={t(strs.메뉴)}
        />
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" color="izone.500">
            {t(strs.메뉴)}
          </DrawerHeader>
          <DrawerCloseButton margin="2" aria-label={t(strs.닫기)}>
            <CloseIcon />
          </DrawerCloseButton>
          <DrawerBody>
            <MemberList />
            <Button
              marginTop="4"
              leftIcon={<SettingsIcon />}
              onClick={() => {
                navigation.navigate(paths.CONFIG);
              }}
            >
              {t(strs.설정)}
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default LeftDrawler;
