import React, { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import MemberList from "./MemberList";

function LeftDrawler() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        colorScheme="izone"
        onClick={onOpen}
        ref={btnRef}
        leftIcon={<HamburgerIcon />}
      >
        메뉴
      </Button>
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
          <DrawerCloseButton>닫기</DrawerCloseButton>
          <DrawerBody>
            <MemberList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default LeftDrawler;
