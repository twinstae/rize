import { configureSync, getLogger, getTextFormatter, type Logger, type Sink } from '@logtape/logtape';

const MAX_LOG_ENTRIES = 2000;
const logEntries: string[] = [];

const formatter = getTextFormatter({
	timestamp: 'rfc3339',
	timeZone: 'Asia/Seoul',
});

const bufferSink: Sink = (record) => {
	logEntries.push(formatter(record));
	if (logEntries.length > MAX_LOG_ENTRIES) {
		logEntries.shift();
	}
};

let initialized = false;

export function initDebugLog() {
	if (initialized) {
		return;
	}
	initialized = true;
	configureSync({
		sinks: { buffer: bufferSink },
		loggers: [{ category: 'rize', lowestLevel: 'debug', sinks: ['buffer'] }],
	});
}

initDebugLog();

export const debugLogger = {
	fs: () => getLogger(['rize', 'fs']),
	storage: () => getLogger(['rize', 'storage']),
};

export function summarizeValue(value: unknown): string {
	if (value === undefined) {
		return 'undefined';
	}
	if (value === null) {
		return 'null';
	}
	if (typeof value === 'string') {
		return `string(${value.length})`;
	}
	try {
		const json = JSON.stringify(value);
		if (json.length <= 200) {
			return json;
		}
		return `json(${json.length})`;
	} catch {
		return String(value);
	}
}

export async function withDebugLog<T>(
	logger: Logger,
	action: string,
	meta: Record<string, unknown>,
	fn: () => Promise<T> | T,
): Promise<T> {
	logger.debug('{action} start', { action, ...meta });
	try {
		const result = await fn();
		logger.info('{action} ok', { action, ...meta, result: summarizeValue(result) });
		return result;
	} catch (error) {
		const message = String(error);
		logger.error('{action} failed: {error}', { action, ...meta, error: message });
		throw error;
	}
}

export function formatErrorForLog(error: Error): string {
	const lines = ['=== Error ===', `name: ${error.name}`, `message: ${error.message}`];
	if (error.stack) {
		lines.push(error.stack);
	}
	if (error.cause) {
		lines.push(`cause: ${String(error.cause)}`);
	}
	return lines.join('\n');
}

export function getDebugLogText(error?: Error): string {
	return [
		'=== Rize Debug Log ===',
		`generatedAt: ${new Date().toISOString()}`,
		`userAgent: ${navigator.userAgent}`,
		'',
		...(error ? [formatErrorForLog(error), ''] : []),
		'=== Logs ===',
		logEntries.join('\n'),
	].join('\n');
}

export function downloadDebugLog(error: Error) {
	const text = getDebugLogText(error);
	const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = `rize-debug-${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
	anchor.click();
	URL.revokeObjectURL(url);
}

export function clearDebugLogForTest() {
	logEntries.length = 0;
}
