import React from 'react';
import { ko } from '../i18n/i18n';
import OrderToggleButton from './OrderToggleButton';
import toggleTest from 'src/test/toggleTest';

describe('OrderToggleButton', () => {
	toggleTest(<OrderToggleButton />, {
		role: 'button',
		offOnNames: [ko.최신순, ko.오랜순],
		key: 'o',
	});
});
