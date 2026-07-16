import { defineConfig } from '@stackflow/config';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import { stackflow, useActivity, useFlow, useStepFlow } from '@stackflow/react';
import React from 'react';

import Config from '../pages/Config';
import MailDetailPage from '../pages/MailDetailPage';
import MailListPage from '../pages/MailListPage';
import { wrapLayout } from './Layout';
import { LinkProps, Navigation } from './useNavigation';
import AlbumPage from '../pages/AlbumPage';
import Test from '../test/Test';
import invariant from '../invariant';
import toObject from '../toObject';
import NonNullableValueObject from '../NonUndefinedObject';
import ChatPage from '../pages/ChatPage';

const components = {
	Config: wrapLayout(Config),
	MailListPage: wrapLayout(MailListPage),
	MailDetailPage: wrapLayout(MailDetailPage),
	AlbumPage: wrapLayout(AlbumPage),
	Test: wrapLayout(Test),
	ChatPage: wrapLayout(ChatPage),
};

declare module '@stackflow/config' {
	interface Register {
		Config: Record<string, string>;
		MailListPage: Record<string, string>;
		MailDetailPage: Record<string, string>;
		AlbumPage: Record<string, string>;
		Test: Record<string, string>;
		ChatPage: Record<string, string>;
	}
}

const activityNames = Object.keys(components);

type ActivityName = keyof typeof components;

const config = defineConfig({
	activities: activityNames.map((name) => ({ name: name as ActivityName })),
	initialActivity: () => 'MailListPage',
	transitionDuration: 350,
});

export const { Stack } = stackflow({
	config,
	components,
	plugins: [
		basicRendererPlugin(),
		basicUIPlugin({
			theme: 'cupertino',
			dimBackgroundColor: '#fff',
		}),
	],
});

export { useFlow, useStepFlow };

export const parsePath = (path: string): [ActivityName, Record<string, string>] => {
	const [name, rawParams] = path.split('?');
	const params = rawParams ? toObject(new URLSearchParams(rawParams)) : {};
	invariant(name in components, `${path} is not in activities.\n ${activityNames.join('\n')}`);

	return [name as ActivityName, params];
};

export const useStackNavigation = (): Navigation => {
	const { name, params } = useActivity();
	const { push, pop, replace } = useFlow();
	const { pushStep, replaceStep } = useStepFlow(name as ActivityName);

	const navigate = (path: string) => {
		const [nextName, nextParams] = parsePath(path);
		if (name === nextName) {
			pushStep(nextParams);
		} else {
			push(nextName, nextParams, { animate: true });
		}
	};
	const redirect = (path: string) => {
		const [nextName, nextParams] = parsePath(path);
		if (name === nextName) {
			replaceStep(nextParams);
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
		Link: React.forwardRef(({ to, children, isRedirect = false, ...props }: LinkProps, ref) =>
			React.createElement(
				'a',
				{
					...props,
					ref,
					href: to,
					onClick: (e: React.MouseEvent) => {
						e.preventDefault();
						if (isRedirect) {
							redirect(to);
						} else {
							navigate(to);
						}
					},
				},
				children,
			),
		),
	};
};
