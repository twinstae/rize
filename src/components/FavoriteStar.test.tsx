import React from 'react';
import FavoriteStar from './FavoriteStar';
import toggleTest from '../test/toggleTest';
import { ko } from '../i18n/i18n';

describe('FavoriteStar', () => {
	toggleTest(<FavoriteStar mailId="m25731" />, {
		role: 'button',
		offOnNames: [new RegExp(ko.중요_표시), new RegExp(ko.중요_취소)],
		key: '{Space}',
	});
});
