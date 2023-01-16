import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow, useActivity } from '@stackflow/react';
import React from 'react';

import Config from '../pages/Config';
import MailDetailPage from '../pages/MailDetailPage';
import MailListPage from '../pages/MailListPage';
import { wrapLayout } from './Layout';
import { Navigation } from './useNavigation';
import { basicUIPlugin } from '@stackflow/basic-ui';
import AlbumPage from '../pages/AlbumPage';
import Test from '../test/Test';
import invariant from '../invariant';
import toObject from '../toObject';
import NonNullableValueObject from '../NonUndefinedObject';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';

const activities = {
  Config: wrapLayout(Config),
  MailListPage: wrapLayout(MailListPage),
  MailDetailPage: wrapLayout(MailDetailPage),
  AlbumPage: wrapLayout(AlbumPage),
  Test: wrapLayout(Test)
};

const activityNames = Object.keys(activities);

type ActivityName = keyof typeof activities;

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities,
  initialActivity: () => 'MailListPage',
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
    }),
    historySyncPlugin({
      routes: {
        MailListPage: '/',
        MailDetailPage: '/mail/:mailId',
        AlbumPage: '/album',
        Config: '/config',
        Test: '/test',
      },
      fallbackActivity: () => 'Test',
      useHash: false,
    }),
  ],
});

export const parsePath = (
  path: string
): [ActivityName, Record<string, string>] => {
  const [name, rawParams] = path.split('?');
  const params = rawParams ? toObject(new URLSearchParams(rawParams)) : {};
  invariant(name in activities, `${path} is not in activities.\n ${activityNames.join('\n')}`);

  return [name as ActivityName, params];
};

export const useStackNavigation = (): Navigation => {
  const { name, params } = useActivity();
  const { push, pop, replace } = useFlow();

  const navigate = (path: string) => {
    push(...parsePath(path));
  };
  return {
    params: () => params,
    useSearchParams: () => {
      return [
        new URLSearchParams(NonNullableValueObject(params)),
        (newInit: URLSearchParams) => replace(name as ActivityName, { ...params, ...toObject(newInit) }),
      ];
    },
    current: () => name as ActivityName,
    navigate,
    goBack: () => pop(),
    redirect: (path: string) => replace(...parsePath(path), { animate: false }),
    Link: (props: { className?: string, to: string; children: React.ReactNode }) =>
      React.createElement(
        'a',
        { href: props.to, onClick: (e: React.MouseEvent) => { e.preventDefault(); navigate(props.to); }, className: props.className },
        props.children
      ),
  };
};
