import React from "react";
import MailList from "../../components/MailList";
import { withSuspense } from "../../hooks/util";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import LeftDrawler from "../../components/LeftDrawler";
import DarkModeButton from "../../components/DarkModeButton";
import { SearchIcon } from "@chakra-ui/icons";
import useSearch from "../../search/useSearch";
import useMailList from "../../mailList/useMailList";
import _ from "lodash";

const AppBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.5rem;
`;

function MailListPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useMailList().mailList("all");
  const { keyword, search, isInResult } = useSearch(data || []);

  const debounceSearch = _.debounce((text) => search(text), 300);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <AppBar>
        {isOpen ? (
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              autoFocus
              type="text"
              placeholder="검색"
              htmlSize={16}
              width="auto"
              onKeyUp={handleKeyUp}
              onChange={handleChange}
              onBlur={onClose}
            />
          </InputGroup>
        ) : (
          <>
            <LeftDrawler />
            <DarkModeButton />
            <Button
              onClick={onOpen}
              leftIcon={<SearchIcon color="gray.300" />}
              marginLeft="2"
            >
              {keyword || "검색"}
            </Button>
          </>
        )}
      </AppBar>
      <Tabs isFitted colorScheme="red">
        <TabList>
          <Tab>전체</Tab>
          <Tab>읽지 않음</Tab>
          <Tab>중요</Tab>
        </TabList>

        <TabPanels>
          <TabPanel style={{ padding: "0.5rem" }}>
            <MailList mode="all" isInResult={isInResult} />
          </TabPanel>
          <TabPanel style={{ padding: "0.5rem" }}>
            <MailList mode="unread" isInResult={isInResult} />
          </TabPanel>
          <TabPanel style={{ padding: "0.5rem" }}>
            <MailList mode="favorite" isInResult={isInResult} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default withSuspense(MailListPage);
