import { Box } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';

import BackButton from '../components/BackButton';
import { createFsStorageRepository } from '../config/fsStorageRepo';
import fsMailRepository from '../mailList/fsMailRepository';

const fsStorageRepo = createFsStorageRepository('test');

const assert = (assertion: boolean, message: string) => {
  if (assertion === false) throw Error(message);
};

const assertToBe: <T>(a: T, b: T) => void = (a, b) => {
  assert(a === b, `${JSON.stringify(a)} is not equal to ${JSON.stringify(b)}`);
};

const assertToBeArray: (a: unknown) => void = (a) => {
  assert(Array.isArray(a), `${JSON.stringify(a)} is not an Array`);
};

type Suite = [string, () => Promise<void>]

const testSuites: Suite[] = [
  [
    '파일 스토리지에 쓰고 읽어올 수 있다',
    async () => {
      const now = new Date().toISOString();
      await fsStorageRepo.setItem(now);
      const result = await fsStorageRepo.getItem();
      assertToBe(result, now);
    },
  ],
  // [
  //   'fsMailRepository로 pm_list.json을 가져올 수 있다',
  //   async () => {
  //     const result = await fsMailRepository.getAllMailList();
  //     assertToBeArray(result);
  //   },
  // ],
  // [
  //   'fsMailRepository로 mail_body_dict.json을 가져올 수 있다',
  //   async () => {
  //     const result = await fsMailRepository.getMailBodyDict();
  //     assertToBe(typeof result, 'object');
  //   },
  // ],
];

const colorMap = {
  idle: 'gray',
  loading: 'gray',
  success: 'green',
  error: 'red',
};
const resultMap = {
  idle: '? 대기 중',
  loading: '? 실행 중',
  success: '✔️ 통과',
  error: '❌ 실패',
};

const wrapTimer = (run: () => Promise<void>) => async () => {
  const start = Date.now();
  await run();
  const end = Date.now();
  return end - start;
};

function Result({ suite: [message, run] }: { suite: Suite }){
  const { data, status } = useQuery(message, wrapTimer(run));
  return (
    <li style={{ color: colorMap[status] }}>
      {resultMap[status]} : {message} ({data && data / 1000}초)
    </li>
  );
}

function Test() {
  return (
    <Box>
      <BackButton />
      <ul>
        {testSuites?.map((suite) => (
          <Result suite={suite} key={suite[0]} />
        ))}
      </ul>
    </Box>
  );
}

export default Test;
