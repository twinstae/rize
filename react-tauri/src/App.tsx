import React from "react";
import fakeMailRepository from "./mailList/fakeMailRepository";
import { createUseMailList } from "./mailList/useMailList";

const useMailList = createUseMailList(fakeMailRepository);

function App() {
  const { isLoading, data, error } = useMailList();

  if (isLoading) return <span>로딩중</span>;

  if (error) return <span>{JSON.stringify(error)}</span>;

  return (
    <ul>
      {data?.map((mail) => (
        <li>{mail.subject}</li>
      ))}
    </ul>
  );
}

export default App;
