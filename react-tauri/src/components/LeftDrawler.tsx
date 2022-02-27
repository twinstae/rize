import React, { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import MemberList from "./MemberList";
function LeftDrawler() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        variant="ghost"
        onClick={onOpen}
        ref={btnRef}
        icon={<HamburgerIcon />}
        aria-label="메뉴"
      />
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default LeftDrawler;
