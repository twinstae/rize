import { describe, expect, it } from 'vitest';
import {
	clearDebugLogForTest,
	debugLogger,
	formatErrorForLog,
	getDebugLogText,
	summarizeValue,
	withDebugLog,
} from './debugLog';

describe('debugLog', () => {
	it('summarizeValue truncates large json', () => {
		expect(summarizeValue({ a: 'x'.repeat(300) })).toMatch(/^json\(\d+\)$/);
	});

	it('withDebugLog records success and failure', async () => {
		clearDebugLogForTest();
		const logger = debugLogger.fs();

		await withDebugLog(logger, 'testAction', { path: 'a.json' }, async () => 'ok');

		await expect(
			withDebugLog(logger, 'testAction', { path: 'b.json' }, async () => {
				throw new Error('boom');
			}),
		).rejects.toThrow('boom');

		const text = getDebugLogText();
		expect(text).toContain('"testAction" start');
		expect(text).toContain('"testAction" ok');
		expect(text).toContain('"testAction" failed');
		expect(text).toContain('boom');
	});

	it('getDebugLogText includes error details', () => {
		clearDebugLogForTest();
		const error = new Error('production failure');
		error.stack = 'Error: production failure\n    at App.tsx:1:1';

		const text = getDebugLogText(error);
		expect(text).toContain('=== Error ===');
		expect(text).toContain(formatErrorForLog(error));
		expect(text).toContain('production failure');
	});
});
