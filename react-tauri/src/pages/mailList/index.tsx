import React from "react";
import MailList from "../../components/MailList";
import { withSuspense } from "../../hooks/util";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styled from "@emotion/styled";
import LeftDrawler from "../../components/LeftDrawler";

const AppBar = styled.div`
  width: 100%;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.5rem;
`;

function MailListPage() {
  return (
    <div style={{ overflowY: "hidden" }}>
      <AppBar>
        <LeftDrawler />
      </AppBar>
      <Tabs isFitted colorScheme="izone">
        <TabList>
          <Tab>전체</Tab>
          <Tab>읽지 않음</Tab>
          <Tab>중요</Tab>
        </TabList>

        <TabPanels>
          <TabPanel style={{ padding: "0.5rem" }}>
            <MailList mode="all" />
          </TabPanel>
          <TabPanel style={{ padding: "0.5rem" }}>
            <MailList mode="unread" />
          </TabPanel>
          <TabPanel style={{ padding: "0.5rem" }}>
            <MailList mode="favorite" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default withSuspense(MailListPage);
