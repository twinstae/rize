import React from "react";
import { useQuery } from "react-query";
import fsMailRepository from "../mailList/fsMailRepository";
import fsStorageRepo from "../username/fsStorageRepo";

const testSuites: [string, () => Promise<boolean>][] = [
  [
    "파일 스토리지에 쓰고 읽어올 수 있다",
    async () => {
      const now = new Date().toISOString();
      await fsStorageRepo.setItem("test", now);
      const result = await fsStorageRepo.getItem("test");
      return result === now;
    },
  ],
  [
    "fsMailRepository로 pm_list.json을 가져올 수 있다",
    async () => {
      const result = await fsMailRepository.getAllMailList();
      return Array.prototype.isPrototypeOf(result);
    },
  ],
  [
    "fsMailRepository로 mail_body_dict.json을 가져올 수 있다",
    async () => {
      const result = await fsMailRepository.getMailBodyDict();
      return Object.prototype.isPrototypeOf(result);
    },
  ],
];

const execute = async ([message, func]: [
  string,
  () => Promise<boolean>
]): Promise<[string, boolean]> => {
  try {
    const passed = await func();
    return [message, passed];
  } catch (e: any) {
    return [message + "\n" + JSON.stringify(e), false];
  }
};

function Test() {
  const { isSuccess, data } = useQuery<[string, boolean][], Error>(
    "test",
    async () => Promise.all(testSuites.map(execute))
  );

  if (!isSuccess) {
    return <div>테스트 실행 중... 잠시만 기다려주세요.</div>;
  }

  return (
    <ul>
      {data?.map(([message, passed]) => (
        <li key={message} style={{ color: passed ? "green" : "red" }}>
          {passed ? "✔️ 통과" : "❌ 실패"} : {message}
        </li>
      ))}
    </ul>
  );
}

export default Test;
