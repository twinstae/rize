import React, { useEffect, useState } from "react";
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
import { SearchIcon } from "@chakra-ui/icons";
import DarkModeButton from "./DarkModeButton";
import LeftDrawler from "./LeftDrawler";
import { keywordAtom } from "../search/useSearch";
import SelectedTag from "./SelectedTag";
import { useAtom } from "jotai";
import _ from "lodash";

function AppBar() {
  const [keyword, search] = useAtom(keywordAtom);
  const [keywordInput, setKeywordInput] = useState("");

  const debounceSearch = _.debounce((text) => search(text), 500);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
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

  useEffect(() => {
    if (keyword) {
      onOpen();
      setKeywordInput(keyword);
    }
  }, []);

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
            value={keywordInput}
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
