import { CloseIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { strs } from '../i18n/i18n';
import paths from '../router/paths';
import useNavigation from '../router/useNavigation';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import MemberList from './MemberList';

function LeftDrawler() {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <>
      <IconButtonWithTooltip
        onClick={onOpen}
        icon={<HamburgerIcon />}
        aria-label={t(strs.메뉴)}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
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
