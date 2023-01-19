import React, { useRef, useState } from 'react';

import { useDependencies, useMailList } from '../hooks/Dependencies';
import { fileList } from '../mailList/fakeMailRepository';
import { useQueryClient } from '@tanstack/react-query';
import { splashEnd } from '../hooks/splashEndAtom';
import invariant from '../invariant';
import { z } from 'zod';
import { rawMailSchema } from '../mailList/schema';
import { rizeAlert } from '@rize/alert';

const InitPage = () => {
	const { fsJSON, RizeLogo } = useDependencies();
	const status = useMailList().useStatus();
	const client = useQueryClient();

	const [uploaded, setUploaded] = useState<{
		[fileName: string]: boolean | undefined;
	}>({});

	const merged = { ...status, ...uploaded };
	const isAlreadLoaded = Object.values(status).every((v) => v === true);

	const formRef = useRef<HTMLFormElement>(null);

	function getFiles() {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const form = formRef.current!;
		const files = [...form.elements].flatMap((input) => [...((input as HTMLInputElement).files ?? [])]);
		return Array.from(files);
	}

	const everyOk = !Object.values(merged).some((v) => v === false);
	return (
		<div className="flex flex-col justify-center align-middle h-screen">
			<div className="mx-auto text-red-400 text-9xl">
				<RizeLogo onAnimationEnd={splashEnd} />
			</div>
			{Object.values(status).some((v) => v === false) && (
				<form
					ref={formRef}
					className="flex flex-col p-4"
					onSubmit={async (e) => {
						e.preventDefault();
						if (!everyOk) return;

						const files = await Promise.all(
							getFiles()
								.filter((file) => fileList.includes(file.name))
								.map(async (file) => {
									const data = await file.text().then(JSON.parse);
									return {
										name: file.name,
										data,
									};
								}),
						);
						await Promise.all(files.map((file) => fsJSON.writeJSONfile(file.name)(file.data))).then(() => {
							files.forEach((file) => {
								void client.invalidateQueries({
									queryKey: [file.name],
								});
							});
							void client.invalidateQueries({
								queryKey: ['status'],
							});
						});
					}}
				>
					<p className="rounded-lg bg-red-100 p-2">
						Downloads 폴더에 백업한 output 폴더를 넣어주세요. <br />
						문제가 있다면{' '}
						<a href="https://open.kakao.com/o/gPbArZ4c" target="_blank" rel="noreferrer" className="link text-pink-500">
							AS 오픈카톡방
						</a>
						을 찾아주세요.
					</p>
					<ul>
						{fileList.map((name) => {
							const value = merged[name];
							return (
								<li key={name} className="mb-1 p-1">
									<input
										type="checkbox"
										checked={value}
										className="checkbox checkbox-primary checkbox-xs checked:border-red-500"
										readOnly
									/>
									<label>
										{name}
										<input
											type="file"
											accept="application/json"
											onChange={(event) => {
												const input = event.currentTarget as HTMLInputElement;
												const files = input.files;
												invariant(files);
												invariant(files.length > 0);
												files[0]
													.text()
													.then((text) => {
														if (name !== files[0].name) {
															throw Error('파일 명이 다릅니다');
														}
														const data = JSON.parse(text);
														const result = z.array(rawMailSchema).safeParse(data);
														if (result.success) {
															setUploaded((old) => ({
																...old,
																[name]: true,
															}));
														} else {
															throw Error(
																result.error.errors[0].path.join(' -> ') +
																	' 에서 ' +
																	result.error.errors[0].code +
																	' ' +
																	result.error.errors[0].message,
															);
														}
													})
													.catch((error) => {
														if (error.message.includes('JSON')) {
															rizeAlert('JSON 파일이 깨져서 읽을 수 없습니다. \n' + error.message);
														} else {
															rizeAlert(error.message);
														}

														input.value = '';
													});
											}}
										/>
									</label>
								</li>
							);
						})}
					</ul>
					<button className="btn btn-secondary btn-sm p-2" type="submit" disabled={isAlreadLoaded}>
						upload
					</button>
				</form>
			)}
		</div>
	);
};

export default InitPage;
