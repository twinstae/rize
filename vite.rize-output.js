import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const mimeTypes = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.gif': 'image/gif',
	'.json': 'application/json',
};

export function resolveRizeOutputDir() {
	return path.resolve(process.env.RIZE_OUTPUT_DIR ?? path.join(os.homedir(), 'Downloads', 'output'));
}

export function rizeOutputPlugin() {
	const outputDir = resolveRizeOutputDir();

	return {
		name: 'rize-output',
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				if (!req.url?.startsWith('/output/')) {
					return next();
				}

				const relativePath = decodeURIComponent(req.url.slice('/output/'.length).split('?')[0]);
				const filePath = path.normalize(path.join(outputDir, relativePath));

				if (!filePath.startsWith(outputDir)) {
					res.statusCode = 403;
					res.end();
					return;
				}

				fs.stat(filePath, (error, stat) => {
					if (error || !stat.isFile()) {
						return next();
					}

					const ext = path.extname(filePath).toLowerCase();
					res.setHeader('Content-Type', mimeTypes[ext] ?? 'application/octet-stream');
					fs.createReadStream(filePath).pipe(res);
				});
			});
		},
	};
}
