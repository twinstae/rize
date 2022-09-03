import React from 'react';
import { useQuery } from 'react-query';

import BackButton from '../components/BackButton';
import { useDependencies } from '../hooks/Dependencies';

const assert = (assertion: boolean, message: string) => {
  if (assertion === false) throw Error(message);
};

const assertToBe: <T>(a: T, b: T) => void = (a, b) => {
  assert(a === b, `${JSON.stringify(a)} is not equal to ${JSON.stringify(b)}`);
};

const assertToBeArray: (a: unknown) => void = (a) => {
  assert(Array.isArray(a), `${JSON.stringify(a)} is not an Array`);
};

const assertToBeGreaterThan: (a: number, b: number) => void = (
  a: number,
  b: number
) => {
  assert(a > b, `${a} is not greater than ${b}`);
};

type Suite<D> = [string, (dependencies: D) => Promise<void>];
type DependenciesT = ReturnType<typeof useDependencies>;
const testSuites: Suite<DependenciesT>[] = [
  [
    '스토리지에 쓰고 읽어올 수 있다',
    async ({ storageRepo }: DependenciesT) => {
      const now = new Date().toISOString();
      await storageRepo.setItem(now);
      const result = await storageRepo.getItem();
      assertToBe(result, now);
    },
  ],
  [
    'mailList를 가져올 수 있다',
    async ({ mailRepository }) => {
      const result = await mailRepository.getAllMailList();
      assertToBeGreaterThan(result.length, 0);
      assertToBeArray(result);
    },
  ],
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

function Result({ suite: [message, run] }: { suite: Suite<DependenciesT> }) {
  const dependencies = useDependencies();
  const { data, status, error } = useQuery<number, Error>(
    message,
    wrapTimer(() => run(dependencies))
  );
  return (
    <li style={{ color: colorMap[status] }}>
      {resultMap[status]} : {message} ({data && data / 1000}초)
      {status === 'error' && error && error.message}
    </li>
  );
}

function Test() {
  return (
    <div>
      <BackButton />
      <ul>
        {testSuites?.map((suite) => (
          <Result suite={suite} key={suite[0]} />
        ))}
      </ul>
    </div>
  );
}

export default Test;
