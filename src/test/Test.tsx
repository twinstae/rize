import React, { useEffect, useState } from 'react';

import BackButton from '../components/BackButton';
import { useDependencies } from '../hooks/Dependencies';
import { useQuery } from '@tanstack/react-query';
import initTest from './initTest';
import { VStack } from '../components/rize-ui';
import useNavigation from '../router/useNavigation';
import useConfig from '../config/useConfig';
import { RESET } from 'jotai/utils';

const assert = (assertion: boolean, message: string) => {
  if (assertion === false) throw Error(message);
};

const assertToBe: <T>(a: T, b: T) => void = (a, b) => {
  assert(a === b, `${JSON.stringify(a)} is not equal to ${JSON.stringify(b)}`);
};

const assertJSONEqual: <T>(a: T, b: T) => void = (a, b) => {
  assert(JSON.stringify(a) === JSON.stringify(b), `${JSON.stringify(a)} is not equal to ${JSON.stringify(b)}`);
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
      await storageRepo.setItem('test', now);
      const result = await storageRepo.getItem('test');
      assertToBe(result, now);
      await storageRepo.removeItem('test');
    },
  ],
  [
    'json 파일을 읽고 쓸 수 있다',
    async ({ fsJSON }: DependenciesT) => {
      const expected = {
        test: 'test'
      };
      await fsJSON.writeJSONfile('test-fs-json.json')(expected);

      const result = await fsJSON.readJSONfile('test-fs-json.json');
      assertJSONEqual(result, expected);
      const cached = await fsJSON.readJSONfile('test-fs-json.json');
      assertJSONEqual(result, cached);
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
  const { data, status, error } = useQuery<number, Error>({
    queryKey: ['test-result', message],
    queryFn: wrapTimer(() => run(dependencies))
  });
  return (
    <li style={{ color: colorMap[status] }}>
      {resultMap[status]} : {message} ({data && data / 1000}초)
      {status === 'error' && error && error.message}
    </li>
  );
}

function Test() {
  const [isError, setIsError] = useState(false);
  const { fsJSON } = useDependencies();
  const [, dispatch] = useConfig<string>('test', '');
  const navigation = useNavigation();

  useEffect(() => {
    if (isError){
      throw Error('테스트 용 에러');
    }
    dispatch(RESET);
  }, [isError]);

  return (
    <div>
      <BackButton />
      <ul>
        {testSuites?.map((suite) => (
          <Result suite={suite} key={suite[0]} />
        ))}
      </ul>
      <VStack className="p-2 gap-2">
        <button className="btn btn-error" onClick={() => {
          setIsError(true);
        }}>에러 일으키기</button>
        <button className="btn btn-primary" onClick={() => {
          initTest({ navigation, writeJSONfile: fsJSON.writeJSONfile });
        }}>e2e 테스트 시작</button>
      </VStack>
    </div>
  );
}

export default Test;
