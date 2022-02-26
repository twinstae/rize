import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import QueryWrapper from "./hooks/QueryWrapper";
import { Dependencies, DependenciesWrapper } from "./hooks/Dependencies";
import useRRDNavigation from "./router/useRRDNavigation";
import { HashRouter } from "react-router-dom";
import useUsernameService from "./username/useUsernameService";
import "./index.css";
import Image from "./components/Image";
import i18n from "./i18n/i18n";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import theme from "./theme/theme";
import { memberNameDict, nameToNumberDict } from "./constants";
import { atom, useAtom } from "jotai";

const currentTagAtom = atom("");

const Wrapper: WrapperT = ({ children }) => {
  const navigation = useRRDNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [tag, setTag] = useAtom(currentTagAtom);

  return (
    <Dependencies.Provider
      value={{
        toNick: (member: string) => memberNameDict[nameToNumberDict[member]],
        navigation,
        usernameService: useUsernameService(),
        Image,
        isDark: colorMode === "dark",
        toggleDark: toggleColorMode,
        tag,
        setTag,
      }}
    >
      {children}
    </Dependencies.Provider>
  );
};

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <HashRouter>
      <QueryWrapper>
        <Wrapper>
          <App />
        </Wrapper>
      </QueryWrapper>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
