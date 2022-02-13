import React from "react";
import { fs } from "@tauri-apps/api";
import tauriMailRepository from "./mailList/tauriMailRepository";
import { createUseMailList } from "./mailList/useMailList";
const useMailList = createUseMailList(tauriMailRepository);

function App() {
  const result = useMailList();

  if (result.isLoading) return <span>로딩중</span>;

  if (result.error) return <span>{JSON.stringify(result.error)}</span>;

  return <h1>테스트 {JSON.stringify(result.data)}</h1>;
}

export default App;
