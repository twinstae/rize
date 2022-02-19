import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { pipeWrapper } from "./hooks/util";
import { ThemeWrapper } from "./theme/useTheme";
import QueryWrapper from "./hooks/QueryWrapper";
import { DependenciesWrapper } from "./hooks/Dependencies";
import useRRDNavigation from "./router/useRRDNavigation";
import "./index.css";
import { MemoryRouter } from "react-router-dom";

const Wrapper: WrapperT = ({ children }) => {
  const navigation = useRRDNavigation();
  const MergedWrapper = pipeWrapper(
    ThemeWrapper,
    QueryWrapper,
    DependenciesWrapper({
      toNick: (name: string) => name,
      navigation,
    })
  );

  console.log(navigation.current());

  return <MergedWrapper>{children}</MergedWrapper>;
};

ReactDOM.render(
  <MemoryRouter>
    <Wrapper>
      <App />
    </Wrapper>
  </MemoryRouter>,
  document.getElementById("root")
);
