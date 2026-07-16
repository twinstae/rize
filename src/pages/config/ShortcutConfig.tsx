import React from 'react';
import { strs, useTranslation } from '../../i18n/i18n';
import { KBD } from '../../components/rize-ui-web';
import ConfigCard from './ConfigCard';

function ShortcutConfig() {
	const { t } = useTranslation();
	return (
		<ConfigCard title={`${t(strs.단축키)}`}>
			<ul className="flex flex-col gap-2 text-sm text-[var(--rize-text-secondary)]">
				<li>
					<KBD>/</KBD> 검색
				</li>
				<li>
					<KBD>Esc</KBD> 검색 창 닫기
				</li>
				<li>
					<KBD>← Backspace</KBD> 뒤로가기
				</li>
				<li>
					<KBD>a</KBD> 앨범
				</li>
				<li>
					<KBD>d</KBD> 다크 테마 전환
				</li>
			</ul>
		</ConfigCard>
	);
}

export default ShortcutConfig;
