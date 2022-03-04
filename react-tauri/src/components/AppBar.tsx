import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  InputRightElement,
  IconButton,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";
import LeftDrawler from "./LeftDrawler";
import DarkModeButton from "./DarkModeButton";
import { SearchIcon } from "@chakra-ui/icons";
import _ from "lodash";
import { useAtom } from "jotai";
import { keywordAtom } from "../search/useSearch";
import SelectedTag from "./SelectedTag";

function AppBar() {
  const [, search] = useAtom(keywordAtom);

  const debounceSearch = _.debounce((text) => search(text), 300);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleClose() {
    onClose();
    search("");
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      handleClose();
    }
  }

  return (
    <HStack padding="2" borderBottom="1px solid #e2e8f0">
      {isOpen ? (
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            autoFocus
            type="text"
            placeholder="검색하기"
            htmlSize={16}
            width="90%"
            onKeyUp={handleKeyUp}
            onChange={handleChange}
          />
          <InputRightElement>
            <CloseButton
              h="1.75rem"
              size="sm"
              onClick={handleClose}
              aria-label="검색창 닫기"
            />
          </InputRightElement>
        </InputGroup>
      ) : (
        <>
          <LeftDrawler />
          <DarkModeButton />
          <SelectedTag />
          <IconButton
            position="absolute"
            right="3"
            variant="ghost"
            onClick={onOpen}
            icon={<SearchIcon />}
            marginLeft="2"
            aria-label="검색"
          />
        </>
      )}
    </HStack>
  );
}

export default AppBar;
