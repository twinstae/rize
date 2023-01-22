import React, { useEffect, useState } from 'react';

import BackButton from '../components/BackButton';
import { useDependencies } from '../hooks/Dependencies';
import { useQuery } from '@tanstack/react-query';
import initTest, { ResultT, testResultAtom } from './initTest';
import { VStack } from '../components/rize-ui-web';
import useNavigation from '../router/useNavigation';
import useConfig from '../config/useConfig';
import { RESET } from 'jotai/utils';
import { useStore } from '@nanostores/react';

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

const assertToBeGreaterThan: (a: number, b: number) => void = (a: number, b: number) => {
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
				test: 'test',
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
		queryFn: wrapTimer(() => run(dependencies)),
	});
	return (
		<li style={{ color: colorMap[status] }}>
			{resultMap[status]} : {message} ({data && data / 1000}초)
			{status === 'error' && error && error.message}
		</li>
	);
}

function FailResultItem({ result }: { result: { message: string; stack: string } }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<label className="text-xl font-medium">
				<span className="text-red-600">FAIL:</span> {result.message}
				<input type="checkbox" checked={isOpen} onChange={(e) => setIsOpen(e.currentTarget.checked)} hidden />
				{isOpen ? ' -' : ' +'}
			</label>
			{isOpen && (
				<div className="break-words h-full">
					<div dangerouslySetInnerHTML={{ __html: result.stack }} className="text-result" />
				</div>
			)}
		</>
	);
}

function TestResult() {
	const testResult: ResultT[] = useStore(testResultAtom);

	if (testResult.length === 0) {
		return <></>;
	}
	return (
		<ul className="bg-base-100 shadow-lg ring-2 w-full overflow-y-scroll p-1 rounded-lg">
			{testResult.map((result) => (
				<li key={result.message}>
					{result.pass ? (
						<>
							<span className="text-green-600">PASS:</span> {result.message}
						</>
					) : (
						<FailResultItem result={result} />
					)}
				</li>
			))}
		</ul>
	);
}

function Test() {
	const [isError, setIsError] = useState(false);
	const { fsJSON } = useDependencies();
	const [, dispatch] = useConfig<string>('test', '');
	const navigation = useNavigation();

	useEffect(() => {
		if (isError) {
			throw Error('테스트 용 에러');
		}
		dispatch(RESET);
	}, [isError]);

	return (
		<VStack className="p-2 bg-base-100 min-h-screen">
			<div className="p-1">
				<BackButton />
			</div>
			<ul>
				{testSuites?.map((suite) => (
					<Result suite={suite} key={suite[0]} />
				))}
			</ul>
			<VStack className="p-2 gap-2">
				<button
					className="btn btn-error"
					onClick={() => {
						setIsError(true);
					}}
				>
					에러 일으키기
				</button>
				<button
					className="btn btn-primary"
					onClick={() => {
						initTest({ navigation, writeJSONfile: fsJSON.writeJSONfile });
					}}
				>
					e2e 테스트 시작
				</button>
			</VStack>
			<TestResult />
		</VStack>
	);
}

export default Test;
