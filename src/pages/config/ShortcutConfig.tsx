import React from 'react';
import { strs, useTranslation } from '../../i18n/i18n';
import { KBD } from '../../components/rize-ui-web';
import ConfigCard from './ConfigCard';

function ShortcutConfig() {
	const { t } = useTranslation();
	return (
		<ConfigCard title={`${t(strs.단축키)}`}>
			<li className="list-none"><KBD>/</KBD>: 검색</li>
			<li className="list-none"><KBD>Esc</KBD>: 검색 창 닫기</li>
			<li className="list-none"><KBD> ← Backspace</KBD>: 뒤로가기</li>
			<li className="list-none"><KBD>a</KBD>: 앨범</li>
			<li className="list-none"><KBD>d</KBD>: 다크 테마 전환</li>
			<li className="list-none"><KBD>f</KBD>: 중요</li>
			<li className="list-none"><KBD>j</KBD>: 다음 메일</li>
			<li className="list-none"><KBD>k</KBD>: 이전 메일</li>
		</ConfigCard>
	);
}

export default ShortcutConfig;