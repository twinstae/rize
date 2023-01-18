import React from 'react';

import paths from '../../router/paths';
import useNavigation from '../../router/useNavigation';

function TestingButton() {
	const { Link } = useNavigation();

	return (
		<Link to={paths.TEST} className="btn btn-primary">
			테스트 페이지 (개발자용)
		</Link>
	);
}

export default TestingButton;
