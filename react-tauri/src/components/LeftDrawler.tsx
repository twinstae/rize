import React, { useRef } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';
import MemberList from './MemberList';
import paths from '../router/paths';
import { useDependencies } from '../hooks/Dependencies';

function LeftDrawler() {
  const { navigation } = useDependencies()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Tooltip label="메뉴">
        <IconButton
          variant="ghost"
          onClick={onOpen}
          ref={btnRef}
          icon={<HamburgerIcon />}
          aria-label="메뉴"
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
            메뉴
          </DrawerHeader>
          <DrawerCloseButton margin="2" aria-label="닫기">
            <CloseIcon />
          </DrawerCloseButton>
          <DrawerBody>
            <MemberList />
            <Button
              marginTop="4"
              leftIcon={<SettingsIcon />}
              onClick={()=>{
                navigation.navigate(paths.CONFIG)
              }}
            >
              설정
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default LeftDrawler;
