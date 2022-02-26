import React from "react";
import MailList from "../../components/MailList";
import { withSuspense } from "../../hooks/util";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import _ from "lodash";
import { useDependencies } from "../../hooks/Dependencies";
import AppBar from "../../components/AppBar";

const modes: TabMode[] = ["all", "unread", "favorite"];

function MailListPage() {
  const { isDark } = useDependencies();
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div style={{ overflow: "hidden" }}>
      <AppBar />
      <Tabs
        isFitted
        colorScheme={isDark ? "pink" : "izone"}
        index={tabIndex}
        onChange={setTabIndex}
      >
        <TabList>
          <Tab>전체</Tab>
          <Tab>읽지 않음</Tab>
          <Tab>중요</Tab>
        </TabList>

        <TabPanels>
          {modes.map((mode) => (
            <TabPanel style={{ padding: "0.5rem" }} key={mode}>
              <MailList mode={modes[tabIndex]} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default withSuspense(MailListPage);
