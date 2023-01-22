import { createUseCacheSrc, CacheRepo, getDirPath } from './useCacheSrc';
import invariant from '../invariant';
import { vi } from 'vitest';

export function createDirList(pathList: string[]){
	return [
		...new Set(pathList.flatMap(v => {
			const chunks = v.split('/');
			let current = '';
			const result = [];
			for (const chunk of chunks.slice(0, chunks.length - 1)){
				current += chunk + '/';
				result.push(current);
			}
			return result;
		}))
	];
}

function createFakeCacheRepo(log: (message: string) => void){
	const file: Record<string, undefined | true> = {
		'img/': true,
		'img/mail/': true,
		'img/mail/1/': true,
		'img/mail/1/20210101/': true,
		'img/mail/2/20210101/': undefined,
		'img/mail/1/20210101/test.jpg': true,
		'img/profile/one-the-story/': undefined,
	};
		
	const savedCache: Record<string, string | undefined> = {};
	const fakeCacheRepo = {
		async saveCache(cache: Record<string, string | undefined>){
			Object.assign(savedCache, cache);
			log('saveCache');
		},
		async loadCache(){
			return savedCache;
		},
		async makeDir(path: string){
			invariant(file[path] === undefined, `${path} 디렉토리는 이미 있습니다`);
			file[path] = true;
		},
		async isDirectoryExists(path: string){
			const dirs = createDirList([path]);
			return dirs.every(parent => parent in file);
		},
		async getCacheSrc(path: string){
			if (path in file){
				return 'http://cache/'+path;
			}
			return undefined;
		},
		async readDir(path: string){
			invariant(path in file);
			const result = Object.keys(file).filter(p => p.startsWith(path) && p !== path);
				
			return result.map(path => ({ path, src: 'http://cache/'+path, type: path.endsWith('/') ? 'directory' : 'file' }));
		},
		async downloadFile(url: string, path: string){
			file[path] = true;
			return this.getCacheSrc(path);
		},
		getRemoteSrc(path: string){
			return 'http://remote/'+path;
		},
	
	} satisfies CacheRepo;
	return fakeCacheRepo;
}

const fileList = [
	'img/mail/1/20210101/test.jpg',
	'img/mail/1/20210101/test2.jpg',
	'img/mail/2/20210101/test.jpg',
	'img/profile/one-the-story/혼다 히토미.jpg',
	'img/profile/one-the-story/권은비.jpg',
];

it('createDirList', () =>{
	expect(createDirList(fileList)).toEqual([
		'img/',
		'img/mail/',
		'img/mail/1/',
		'img/mail/1/20210101/',
		'img/mail/2/',
		'img/mail/2/20210101/',
		'img/profile/',
		'img/profile/one-the-story/',
	]);
});

it('getDirPath', () => {
	expect(getDirPath('img')).toBe('');
	expect(getDirPath('img/rabbit.jpg')).toBe('img/');
	expect(getDirPath('img/profile/one-the-story/혼다 히토미.jpg')).toBe('img/profile/one-the-story/');
});

describe('useCacheSrc', () => {
	it('scenario', async () => {
		vi.useFakeTimers();
		const logs: string[] = [];
		const fakeCacheRepo = createFakeCacheRepo((message) => { logs.push(message); });
		const init = createUseCacheSrc(fakeCacheRepo);
		const useCacheSrc = await init(createDirList(fileList));
		// repo를 초기화한 직후에 cache를 저장한다.
		expect(logs).toEqual(['saveCache']);
		expect(useCacheSrc('img/mail/1/20210101/test.jpg')).toBe('http://cache/img/mail/1/20210101/test.jpg');
		
		expect(useCacheSrc('img/profile/one-the-story/혼다 히토미.jpg')).toBe('http://remote/img/profile/one-the-story/혼다 히토미.jpg');
		expect(useCacheSrc('img/profile/one-the-story/권은비.jpg')).toBe('http://remote/img/profile/one-the-story/권은비.jpg');
		expect(useCacheSrc('img/profile/one-the-story/권은비.jpg')).toBe('http://remote/img/profile/one-the-story/권은비.jpg');

		await vi.runAllTimersAsync();
		expect(useCacheSrc('img/profile/one-the-story/권은비.jpg')).toBe('http://cache/img/profile/one-the-story/권은비.jpg');
		expect(useCacheSrc('img/profile/one-the-story/혼다 히토미.jpg')).toBe('http://cache/img/profile/one-the-story/혼다 히토미.jpg');
		// 데이터를 여러 개 가져와도 한 번만 저장한다 (쓰로틀링)
		expect(logs).toEqual(['saveCache', 'saveCache']);

		const init2 = createUseCacheSrc(fakeCacheRepo);
		const useCacheSrc2 = await init2(createDirList(fileList));
		// 다시 초기화한 뒤에도 저장한다
		expect(logs).toEqual(['saveCache', 'saveCache', 'saveCache']);
		expect(useCacheSrc2('img/profile/one-the-story/권은비.jpg')).toBe('http://cache/img/profile/one-the-story/권은비.jpg');
		expect(useCacheSrc2('img/profile/one-the-story/혼다 히토미.jpg')).toBe('http://cache/img/profile/one-the-story/혼다 히토미.jpg');

		// 다운 받은 이미지가 없으면 캐시는 업데이트되지 않는다
		expect(logs).toEqual(['saveCache', 'saveCache', 'saveCache']);
		vi.useRealTimers();
	});
});