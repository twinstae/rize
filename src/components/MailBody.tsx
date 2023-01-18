import React from 'react';

import useUsername from '../config/useUsername';
import { useDependencies } from '../hooks/Dependencies';
import invariant from '../invariant';

interface Props {
	mailBody: {
		body: string;
		images: string[];
	};
}

function MailBody({ mailBody }: Props) {
	const { Image } = useDependencies();
	const usernameService = useUsername();
	const body = usernameService.replaceUsername(mailBody.body);
	const images = mailBody.images;
	const parts = body.split('{이미지}');
	function getPath(index: number) {
		const imagePath = images[index];
		invariant(imagePath, `${index}, ${JSON.stringify(images)}`);
		return imagePath;
	}

	return (
		<>
			{parts.map((part, i) => (
				<div key={part + i}>
					<div
						className="p-4 leading-6"
						dangerouslySetInnerHTML={{
							__html: part,
						}}
					></div>
					{i < images.length && <Image path={getPath(i)} className="w-full rounded-lg" width={416} />}
				</div>
			))}
		</>
	);
}

export default MailBody;
