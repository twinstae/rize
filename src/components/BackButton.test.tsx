import React from 'react';

import paths from '../router/paths';
import BackButton from './BackButton';
import { ko } from '../i18n/i18n';
import linkTest from 'src/router/linkTest';

describe('BackButton', () => {
	linkTest(<BackButton />, {
		name: ko.돌아가기,
		given: paths.CONFIG,
		expected: paths.ROOT,
		key: '{Backspace}'
	});
});
