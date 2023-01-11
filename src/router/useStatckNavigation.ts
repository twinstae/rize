import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { stackflow, useActivity } from '@stackflow/react';
import React from 'react';

import Config from '../pages/Config';
import MailDetailPage from '../pages/MailDetailPage';
import MailListPage from '../pages/MailListPage';
import { wrapLayout } from './Layout';
import { Navigation } from './useNavigation';
import { basicUIPlugin } from '@stackflow/basic-ui';

const activities = {
  Config: wrapLayout(Config),
  MailListPage: wrapLayout(MailListPage),
  MailDetailPage: wrapLayout(MailDetailPage),
};

const activityNames = Object.keys(activities);

type ActivityName = keyof typeof activities;

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities,
  initialActivity: () => 'MailListPage',
  plugins: [basicRendererPlugin(), basicUIPlugin({
    theme: 'cupertino',
  }),],
});

export const parsePath = (
  path: string
): [ActivityName, Record<string, string>] => {
  const [name, rawParams] = path.split('?');
  const params = rawParams
    ? Object.fromEntries(rawParams.split('&').map((param) => param.split('=')))
    : {};
  if (!(name in activities)) {
    throw Error(`${path} is not in activities.\n ${activityNames.join('\n')}`);
  }

  return [name as ActivityName, params];
};

export const useStackNavigation = (): Navigation => {
  const activity = useActivity();
  const { name, params } = activity;
  const { push, pop, replace } = useFlow();

  return {
    params: () => params,
    useSearchParams: () => {
      const result = JSON.parse(JSON.stringify(params));
      return [
        new URLSearchParams(result),
        (newInit) => replace(name as ActivityName, { ...params, newInit }),
      ];
    },
    current: () => name as ActivityName,
    navigate: (path: string) => push(...parsePath(path)),
    goBack: () => pop(),
    redirect: (path: string) => replace(...parsePath(path), { animate: false }),
    Link: (props: { to: string; children: React.ReactNode }) =>
      React.createElement(
        'span',
        { href: props.to, onClick: () => push(...parsePath(props.to)) },
        props.children
      ),
  };
};
