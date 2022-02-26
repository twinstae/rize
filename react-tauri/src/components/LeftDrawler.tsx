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
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import MemberList from "./MemberList";
import { useDependencies } from "../hooks/Dependencies";

function LeftDrawler() {
  const { tag } = useDependencies();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button onClick={onOpen} ref={btnRef} leftIcon={<HamburgerIcon />}>
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
            {tag || "메뉴"}
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
