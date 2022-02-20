import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { pipeWrapper } from "./hooks/util";
import { ThemeWrapper } from "./theme/useTheme";
import QueryWrapper from "./hooks/QueryWrapper";
import { DependenciesWrapper } from "./hooks/Dependencies";
import useRRDNavigation from "./router/useRRDNavigation";
import "./index.css";
import { HashRouter } from "react-router-dom";
import useUsernameService from "./username/useUsernameService";

const Wrapper: WrapperT = ({ children }) => {
  const navigation = useRRDNavigation();
  const MergedWrapper = pipeWrapper(
    ThemeWrapper,
    QueryWrapper,
    DependenciesWrapper({
      toNick: (name: string) => name,
      navigation,
      usernameService: useUsernameService(),
    })
  );

  return <MergedWrapper>{children}</MergedWrapper>;
};

ReactDOM.render(
  <HashRouter>
    <Wrapper>
      <App />
    </Wrapper>
  </HashRouter>,
  document.getElementById("root")
);
