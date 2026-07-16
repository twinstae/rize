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
						className="leading-7 text-[15px] text-[var(--rize-text)] [&_img]:my-4 [&_img]:w-full [&_img]:rounded-2xl"
						dangerouslySetInnerHTML={{
							__html: part,
						}}
					></div>
					{i < images.length && (
						<Image path={getPath(i)} className="my-4 w-full rounded-2xl" width={416} />
					)}
				</div>
			))}
		</>
	);
}

export default MailBody;
