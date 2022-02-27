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

  const [allCount, setAllCount] = React.useState(0);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [favoriteCount, setFavoriteCount] = React.useState(0);

  const setCount = {
    all: setAllCount,
    unread: setUnreadCount,
    favorite: setFavoriteCount,
  };

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
          <Tab>전체 {allCount}</Tab>
          <Tab>읽지 않음 {unreadCount}</Tab>
          <Tab>중요 {favoriteCount}</Tab>
        </TabList>

        <TabPanels>
          {modes.map((mode) => (
            <TabPanel style={{ padding: "0.5rem" }} key={mode}>
              <MailList mode={mode} setCount={setCount[mode]} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default withSuspense(MailListPage);
