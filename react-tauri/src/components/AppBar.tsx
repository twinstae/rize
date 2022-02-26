import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  InputRightElement,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import LeftDrawler from "./LeftDrawler";
import DarkModeButton from "./DarkModeButton";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import _ from "lodash";
import { useAtom } from "jotai";
import { keywordAtom } from "../search/useSearch";

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.5rem;
`;

function AppBar() {
  const [keyword, search] = useAtom(keywordAtom);

  const debounceSearch = _.debounce((text) => search(text), 300);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };
  const { isOpen, onClose, onOpen } = useDisclosure();

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  return (
    <Wrapper>
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
            <IconButton
              icon={<CloseIcon />}
              h="1.75rem"
              size="sm"
              onClick={onClose}
              aria-label="검색창 닫기"
            />
          </InputRightElement>
        </InputGroup>
      ) : (
        <>
          <LeftDrawler />
          <DarkModeButton />
          <Button onClick={onOpen} leftIcon={<SearchIcon />} marginLeft="2">
            {keyword || "검색"}
          </Button>
        </>
      )}
    </Wrapper>
  );
}

export default AppBar;
