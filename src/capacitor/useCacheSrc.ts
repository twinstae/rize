import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Http } from '@capacitor-community/http';
import { Capacitor } from '@capacitor/core';
import { atom } from 'jotai';
import mailDirList from './mail_dir_list.json'; 
import invariant from '../invariant';

export interface CacheRepo {
	saveCache(cache: Record<string, string | undefined>): Promise<void>
	loadCache(): Promise<Record<string, string | undefined>>
	makeDir(path: string): Promise<void>
	isDirectoryExists(path: string): Promise<boolean>
	readDir(path: string): Promise<{ path: string, src: string, type: 'file' | 'directory' }[]>;
	getCacheSrc(path: string): Promise<string | undefined>
	downloadFile(url: string, path: string): Promise<string | undefined>
	getRemoteSrc(path: string): string
}


const capacitorCacheRepo = {
	async saveCache(cache: Record<string, string | undefined>){
		await Filesystem.writeFile({
			path: 'output/image_cache_src_dict.json',
			directory: Directory.Cache,
			encoding: Encoding.UTF8,
			data: JSON.stringify(cache)
		});
	},
	async loadCache(){
		return Filesystem.readFile({
			path: 'output/image_cache_src_dict.json',
			directory: Directory.Cache,
			encoding: Encoding.UTF8,
		}).then(result => JSON.parse(result.data))
			.catch(() => null);
	},
	async makeDir(path: string){
		return Filesystem.mkdir({
			path: 'output/' + path,
			directory: Directory.Cache,
			recursive: true,
		});
	},
	async isDirectoryExists(path: string){
		return Filesystem.stat({
			path: 'output/' + path,
			directory: Directory.Cache,
		}).then(() => true)
			.catch(() => false);
	},
	async getCacheSrc(path: string){
		return Filesystem.stat({
			path: 'output/' + path,
			directory: Directory.Cache,
		}).then((result) => Capacitor.convertFileSrc(result.uri))
			.catch(() => undefined);
	},
	async readDir(path: string){
		return Filesystem.readdir({
			path: 'output/' + path,
			directory: Directory.Cache,
		}).then(result => result.files.map(file => ({
			type: file.type,
			path: path + file.name + (file.type === 'directory' ? '/' : ''),
			src: Capacitor.convertFileSrc(file.uri)
		})));
	},
	async downloadFile(url: string, filePath: string){
		console.log('download', filePath);
		return Http.downloadFile({
			url,
			filePath: 'output/' + filePath,
			fileDirectory: Directory.Cache,
		}).then(result => result.path ? Capacitor.convertFileSrc(result.path) : undefined);
	},
	getRemoteSrc(path: string){
		return 'https://image.rabolution.com/'+path.replace('img/', '');
	},
} satisfies CacheRepo;

export function createUseCacheSrc(repo: CacheRepo){

	const cache: Record<string, string | undefined> = {
	};
	const loading: Record<string, undefined | true> = {
	};
	let initiated = false;

	let timeoutId: undefined | string | number | NodeJS.Timeout = undefined;

	function useCacheSrc(path: string){
		if (path in cache){
			return cache[path];
		}

		if (loading[path] === undefined){
			loading[path] = true;
	
			invariant(initiated, '초기화가 끝나지 않았습니다');
			void repo.downloadFile(repo.getRemoteSrc(path), path)
				.then((src) => {
					cache[path] = src;

					clearTimeout(timeoutId);
					timeoutId = setTimeout(() => {
						void repo.saveCache(cache);
						console.log('캐시를 저장했습니다.');
					}, 1000);
				})
				.catch(() =>{
					loading[path] = undefined;
				});
		}
		return repo.getRemoteSrc(path);
	}

	async function init(dirList: string[]){
		if(! initiated){
			await _initDirectoriesCache();
			await _makeDirectories(dirList);
			initiated = true;	
		}
		
		await repo.saveCache(cache);
		return useCacheSrc;
	}

	async function _makeDirectories(pathList: string[]){
		for (const path of pathList){
			if (! (path in cache)){
				await repo.makeDir(path);
				cache[path] = cache['img/']?.replace('img/', path);
			}
		}
		return;
	}

	async function _initDirectoriesCache() {
		const validSrc = await repo.getCacheSrc('img/');

		const loaded = await repo.loadCache();
		if(loaded && (loaded['img/'] === validSrc)){
			Object.assign(cache, loaded);
			return;
		}


		cache['img/'] = await repo.getCacheSrc('img/');
		if (cache['img/'] === undefined) {
			return repo.makeDir('img/');
		}

		const results = await repo.readDir('img/');
		results.forEach(({path, src}) => {
			cache[path] = src;
		});

		const candidates = new Set(results.filter(file => file.type && file.path).map(({path}) => path));
		while(candidates.size > 0){
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { value: path }  = candidates.keys().next()!;
			const segments = await repo.readDir(path)
				.catch(() => null);
			if (segments){
				segments.forEach((s) => {
					cache[s.path] = s.src;
					if (s.type === 'directory'){
						candidates.add(s.path);
					}
				});
			}
			candidates.delete(path);
		}
	}



	return init;
}

const init = createUseCacheSrc(capacitorCacheRepo);

const useCacheSrcAtom = atom(() => init(mailDirList.map(path => 'img'+path).concat([
	'la-vie-en-rose',
	'violeta',
	'fiesta',
	'secret-diary-id',
	'the-secret-story-of-swan',
	'panorama',
	'eating-trip-3',
	'birthday',
	'one-the-story',
	'latest',
	'instagram',
].map(theme => `img/profile/${theme}/`))));

export default useCacheSrcAtom;