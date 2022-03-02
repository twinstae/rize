import React from "react";
import MailList from "../../components/MailList";
import { withSuspense } from "../../hooks/util";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import _ from "lodash";
import { useDependencies } from "../../hooks/Dependencies";
import AppBar from "../../components/AppBar";
import useSearch from "../../search/useSearch";
import useMailList from "../../mailList/useMailList";

const modes: TabMode[] = ["all", "unread", "favorite"];

function MailListPage() {
  const { isDark, tag } = useDependencies();

  const mailData = useMailList();

  const allMailList = mailData.mailList("all", "");
  const { isInResult } = useSearch(allMailList);

  const results = modes
    .map((mode) => mailData.mailList(mode, tag))
    .map((data) => data.filter((mail) => isInResult(mail.id)));

  return (
    <div style={{ overflow: "hidden" }}>
      <AppBar />
      <Tabs isFitted colorScheme={isDark ? "pink" : "izone"}>
        <TabList>
          <Tab>전체 {results[0].length}</Tab>
          <Tab>읽지 않음 {results[1].length}</Tab>
          <Tab>중요 {results[2].length}</Tab>
        </TabList>

        <TabPanels>
          {modes.map((mode, i) => (
            <TabPanel style={{ padding: "0.5rem" }} key={mode}>
              <MailList allMailList={allMailList} result={results[i]} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default withSuspense(MailListPage);
