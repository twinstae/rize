const fs = require('fs/promises');
const libReport = require('istanbul-lib-report');
const reports = require('istanbul-reports');
const libCoverage = require('istanbul-lib-coverage');

const DEFAULT_ON_GREEN = '\033[0;42m';
const GREEN_ON_DEFAULT = '\033[32;40m';
const DEFAULT_ON_RED = '\033[0;41m';
const RED_ON_DEFAULT = '\033[31;40m';
const RESET = '\033[0m';

function render(item) {
	if (item.pass) {
		console.log(`${GREEN_ON_DEFAULT} ✓ ${item.message}${RESET}`);
	} else {
		console.log(`${RED_ON_DEFAULT} X ${item.message}\n${item.stack}${RESET}`);
	}
}
const OUTPUT = '/home/taehee/Downloads/output/';
fs.readFile(OUTPUT + 'test_result.json', {
	encoding: 'utf-8',
}).then((json) => {
	const result = JSON.parse(json);

	if (result.every((item) => item.pass)) {
		console.log(`${DEFAULT_ON_GREEN} PASS ${RESET}`);
	} else {
		console.log(`${DEFAULT_ON_RED} FAIL ${RESET}`);
	}
	result.forEach((item) => {
		render(item);
	});
});

fs.readFile(OUTPUT + 'coverage.json', {
	encoding: 'utf-8',
}).then((json) => {
	const rawCoverage = JSON.parse(json);
	const context = libReport.createContext({
		dir: './.nyc_output',
		coverageMap: libCoverage.createCoverageMap(rawCoverage),
	});

	reports
		.create('json', {
			file: 'tauri-coverage.json',
		})
		.execute(context);
});
