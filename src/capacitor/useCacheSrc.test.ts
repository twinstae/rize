import { waitFor } from '@testing-library/react';
import { createUseCacheSrc, CacheRepo, createDirList } from './useCacheSrc';
import invariant from '../invariant';

const file: Record<string, undefined | true> = {
	'/img/': true,
	'/img/mail/': true,
	'/img/mail/1/': true,
	'/img/mail/1/20210101/': true,
	'/img/mail/2/20210101/': undefined,
	'/img/mail/1/20210101/test.jpg': true,
	'/img/profile/one-the-story/': undefined,
};

const fileList = [
	'/img/mail/1/20210101/test.jpg',
	'/img/mail/1/20210101/test2.jpg',
	'/img/mail/2/20210101/test.jpg',
	'/img/profile/one-the-story/혼다 히토미.jpg',
	'/img/profile/one-the-story/권은비.jpg',
];

const fakeCacheRepo = {
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
			return 'http://cache'+path;
		}
		return undefined;
	},
	async readDir(path: string){
		invariant(path in file);
		const result = Object.keys(file).filter(p => p.startsWith(path) && p !== path);
			
		return result.map(path => ({ path, src: 'http://cache'+path, type: 'directory' }));
	},
	async downloadFile(url: string, path: string){
		file[path] = true;
		return this.getCacheSrc(path);
	},
	getRemoteSrc(path: string){
		return 'http://remote'+path;
	},

} satisfies CacheRepo;

it('createDirList', () =>{
	expect(createDirList(fileList)).toEqual([
		'/img/',
		'/img/mail/',
		'/img/mail/1/',
		'/img/mail/1/20210101/',
		'/img/mail/2/',
		'/img/mail/2/20210101/',
		'/img/profile/',
		'/img/profile/one-the-story/',
	]);
});

describe('useCacheSrc', () => {
	it('', async () => {
		const init = createUseCacheSrc(fakeCacheRepo);
		const useCacheSrc = await init(createDirList(fileList));
		expect(useCacheSrc('/img/mail/1/20210101/test.jpg')).toBe('http://cache/img/mail/1/20210101/test.jpg');
		
		expect(useCacheSrc('/img/profile/one-the-story/혼다 히토미.jpg')).toBe('http://remote/img/profile/one-the-story/혼다 히토미.jpg');
		expect(useCacheSrc('/img/profile/one-the-story/권은비.jpg')).toBe('http://remote/img/profile/one-the-story/권은비.jpg');
		expect(useCacheSrc('/img/profile/one-the-story/권은비.jpg')).toBe('http://remote/img/profile/one-the-story/권은비.jpg');
		expect(useCacheSrc('/img/profile/one-the-story/혼다 히토미.jpg')).toBe('http://remote/img/profile/one-the-story/혼다 히토미.jpg');
		
		await waitFor(() => {
			expect(useCacheSrc('/img/profile/one-the-story/권은비.jpg')).toBe('http://cache/img/profile/one-the-story/권은비.jpg');
			expect(useCacheSrc('/img/profile/one-the-story/혼다 히토미.jpg')).toBe('http://cache/img/profile/one-the-story/혼다 히토미.jpg');
		});
	});
});