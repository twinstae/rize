import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeWrapper } from "./hooks/useTheme";
import QueryWrapper from "./hooks/QueryWrapper";
import { DependenciesWrapper } from "./hooks/Dependencies";
import useRRDNavigation from "./router/useRRDNavigation";
import { HashRouter } from "react-router-dom";
import useUsernameService from "./username/useUsernameService";
import "./index.css";
import Image from "./components/Image";
import i18n from "./i18n/i18n";

const Wrapper: WrapperT = ({ children }) => {
  const navigation = useRRDNavigation();
  const MergedWrapper = DependenciesWrapper({
    toNick: (name: string) => name,
    navigation,
    usernameService: useUsernameService(),
    Image,
  });
  return <MergedWrapper>{children}</MergedWrapper>;
};

ReactDOM.render(
  <HashRouter>
    <QueryWrapper>
      <ThemeWrapper>
        <Wrapper>
          <App />
        </Wrapper>
      </ThemeWrapper>
    </QueryWrapper>
  </HashRouter>,
  document.getElementById("root")
);
