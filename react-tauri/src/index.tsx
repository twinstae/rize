import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import { atom, useAtom } from "jotai";
import useRRDNavigation from "./router/useRRDNavigation";
import Image from "./components/Image";
import QueryWrapper from "./hooks/QueryWrapper";
import { Dependencies } from "./hooks/Dependencies";
import { toOriginalName } from "./constants";
import "./i18n/i18n";
import "./index.css";

import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import theme from './theme/theme'
import { HashRouter } from "react-router-dom";
import { WrapperT } from "./hooks/util";
import fakeStorageRepo from "./config/fakeStorageRepo";

const currentTagAtom = atom("");

const DependencyWrapper: WrapperT = ({ children }) => {
  const navigation = useRRDNavigation();
  const [tag, setTag] = useAtom(currentTagAtom);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Dependencies.Provider
      value={{
        storageRepo: fakeStorageRepo,
        toNick: toOriginalName,
        navigation,
        isDark: colorMode === "dark",
        toggleDark: toggleColorMode,
        Image,
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
        <DependencyWrapper>
          <App />
        </DependencyWrapper>
      </QueryWrapper>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
