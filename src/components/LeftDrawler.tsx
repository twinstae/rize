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

function ToConfigButton() {
  const { Link } = useNavigation();
  const { t } = useTranslation();
  
  return (
    <Link to={paths.CONFIG}>
      <Button
        marginTop='4'
        leftIcon={<SettingsIcon />}
      >
        {t(strs.설정)}
      </Button>
    </Link> 
  );
}

function LeftDrawler() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <>
      <IconButtonWithTooltip
        onClick={onOpen}
        icon={<HamburgerIcon />}
        aria-label={t(strs.메뉴)}
      />
      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px' color='izone.500'>
            {t(strs.메뉴)}
          </DrawerHeader>
          <DrawerCloseButton margin='2' aria-label={t(strs.닫기)}>
            <CloseIcon />
          </DrawerCloseButton>
          <DrawerBody>
            <MemberList />
            <ToConfigButton />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default LeftDrawler;
