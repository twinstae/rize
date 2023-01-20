import invariant from 'src/invariant';

export interface CacheRepo {
	makeDir(path: string): Promise<void>
	isDirectoryExists(path: string): Promise<boolean>
	readDir(path: string): Promise<string[]>;
	isFileExists(path: string): Promise<boolean>
	downloadFile(url: string, path: string): Promise<void>
	getRemoteSrc(path: string): string
}

const cache: Record<string, undefined | true> = {
};
const loading: Record<string, undefined | true> = {
};
let initiated = false;

export function createDirList(pathList: string[]){
	return [
		...new Set(pathList.flatMap(v => {
			const chunks = v.split('/');
			let current = '/';
			const result = [];
			for (const chunk of chunks.slice(1, chunks.length - 1)){
				current += chunk + '/';
				result.push(current);
			}
			return result;
		}))
	];
}

function getCacheSrc(path: string) {
	if (cache[path]){
		return 'http://cache'+path;
	}
	return undefined;
}

export function createUseCacheSrc(repo: CacheRepo){
	function useCacheSrc(path: string){
		const cacheSrc = getCacheSrc(path);
		if (! cacheSrc) {
			if (loading[path] === undefined){
				loading[path] = true;
			
				void repo.isFileExists(path)
					.then(isFile => {
						if(isFile === false){
							invariant(initiated, '초기화가 끝나지 않았습니다');
							void repo.downloadFile(repo.getRemoteSrc(path), path)
								.then(() => {
									cache[path] = true;
									console.log('downloaded', path);
								});
						} else {
							cache[path] = true;
							console.log('check cache', path);
						}
					})
					.catch(() =>{
						loading[path] = undefined;
					});
			}
			console.log('remote', path);
			return repo.getRemoteSrc(path);
		}
		console.log('cache', path);
		return cacheSrc;
	}

	async function init(fileList: string[]){
		if(! initiated){
			const dirList = createDirList(fileList);
			await _initCache();
			await _makeDirectories(dirList);
			initiated = true;	
		}
		
		return useCacheSrc;
	}

	async function _makeDirectories(pathList: string[]){
		for (const path of pathList){
			if (cache[path] === undefined){
				await repo.makeDir(path);
			}
		}
		return;
	}

	async function _initCache() {
		const candidates = new Set(await repo.readDir('/img/').catch(() => null));
		if (candidates === null){
			return;
		}
		cache['/img/'] = true;
		while(candidates.size > 0){
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { value: path }  = candidates.keys().next()!;
			const segments = await repo.readDir(path)
				.catch(() => null);
			if (segments){
				cache[path] = true;
				segments.forEach(p => {
					candidates.add(p);
					cache[p] = true;
				});
			}
			candidates.delete(path);
		}
	}

	return init;
}
