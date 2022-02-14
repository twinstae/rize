import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { pipeWrapper } from "./hooks/util";
import { ThemeWrapper } from "./theme/useTheme";
import QueryWrapper from "./hooks/QueryWrapper";
import { DependenciesWrapper } from "./hooks/Dependencies";
import "./index.css";

const Wrapper = pipeWrapper(
  ThemeWrapper,
  QueryWrapper,
  DependenciesWrapper({
    toNick: (name: string) => name,
    navigate: (path: string) => {},
  })
);

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
