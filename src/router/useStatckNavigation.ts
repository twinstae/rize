import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow, useActivity } from '@stackflow/react';
import React from 'react';

import Config from '../pages/Config';
import MailDetailPage from '../pages/MailDetailPage';
import MailListPage from '../pages/MailListPage';
import { wrapLayout } from './Layout';
import { LinkProps, Navigation } from './useNavigation';
import { basicUIPlugin } from '@stackflow/basic-ui';
import AlbumPage from '../pages/AlbumPage';
import Test from '../test/Test';
import invariant from '../invariant';
import toObject from '../toObject';
import NonNullableValueObject from '../NonUndefinedObject';
import ChatPage from '../pages/ChatPage';

const activities = {
	Config: wrapLayout(Config),
	MailListPage: wrapLayout(MailListPage),
	MailDetailPage: wrapLayout(MailDetailPage),
	AlbumPage: wrapLayout(AlbumPage),
	Test: wrapLayout(Test),
	ChatPage: wrapLayout(ChatPage),
};

const activityNames = Object.keys(activities);

type ActivityName = keyof typeof activities;

export const { Stack, useFlow, useStepFlow } = stackflow({
	transitionDuration: 350,
	activities,
	initialActivity: () => 'MailListPage',
	plugins: [
		basicRendererPlugin(),
		basicUIPlugin({
			theme: 'cupertino',
		}),
	],
});

export const parsePath = (path: string): [ActivityName, Record<string, string>] => {
	const [name, rawParams] = path.split('?');
	const params = rawParams ? toObject(new URLSearchParams(rawParams)) : {};
	invariant(name in activities, `${path} is not in activities.\n ${activityNames.join('\n')}`);

	return [name as ActivityName, params];
};

export const useStackNavigation = (): Navigation => {
	const { name, params } = useActivity();
	const { push, pop, replace } = useFlow();
	const { stepPush, stepReplace } = useStepFlow(name as ActivityName);

	const navigate = (path: string) => {
		const [nextName, nextParams] = parsePath(path);
		if (name === nextName){
			stepPush(nextParams);
		} else {
			push(nextName, nextParams, { animate: true });
		}
	};
	const redirect = (path: string) => {
		const [nextName, nextParams] = parsePath(path);
		if (name === nextName){
			stepReplace(nextParams);
		} else {
			replace(nextName, nextParams, { animate: true });
		}
	};
	return {
		params: () => params,
		useSearchParams: () => {
			return [
				new URLSearchParams(NonNullableValueObject(params)),
				(newInit: URLSearchParams) => {
					const searchParams = new URLSearchParams(NonNullableValueObject({ ...params, ...toObject(newInit) }));

					redirect(name + '?' + searchParams.toString());
				},
			];
		},
		current: () => name as ActivityName,
		navigate,
		goBack: () => pop(),
		redirect,
		// eslint-disable-next-line react/display-name
		Link: React.forwardRef(({ to, children, isRedirect = false, ...props }: LinkProps, ref) =>
			React.createElement(
				'a',
				{
					...props,
					ref,
					href: to,
					onClick: (e: React.MouseEvent) => {
						e.preventDefault();
						if (isRedirect){
							redirect(to);
						} else {
							navigate(to);
						}
					},
				},
				children,
			))
	};
};
