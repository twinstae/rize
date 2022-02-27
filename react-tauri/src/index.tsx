import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import QueryWrapper from "./hooks/QueryWrapper";
import { Dependencies } from "./hooks/Dependencies";
import useRRDNavigation from "./router/useRRDNavigation";
import useUsernameService from "./username/useUsernameService";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { toOriginalName } from "./constants";
import { HashRouter } from "react-router-dom";
import Image from "./components/Image";
import { atom, useAtom } from "jotai";
import theme from "./theme/theme";
import "./i18n/i18n";
import "./index.css";

const currentTagAtom = atom("");

const Wrapper: WrapperT = ({ children }) => {
  const navigation = useRRDNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [tag, setTag] = useAtom(currentTagAtom);

  return (
    <Dependencies.Provider
      value={{
        toNick: toOriginalName,
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
