import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Config from '../pages/Config';
import MailDetailPage from '../pages/MailDetailPage';
import MailListPage from '../pages/MailListPage';
import AlbumPage from '../pages/AlbumPage';
import Test from '../test/Test';
import ChatPage from '../pages/ChatPage';
import { AppShell } from '../components/LeftDrawer';
import { wrapLayout } from './Layout';
import paths from './paths';

const routes = {
	Config: wrapLayout(Config),
	MailListPage: wrapLayout(MailListPage),
	MailDetailPage: wrapLayout(MailDetailPage),
	AlbumPage: wrapLayout(AlbumPage),
	Test: wrapLayout(Test),
	ChatPage: wrapLayout(ChatPage),
} as const;

function AppRouter() {
	return (
		<IonReactRouter>
			<AppShell>
				<IonRouterOutlet id="main">
					<Route exact path={`/${paths.MAIL_LIST}`} component={routes.MailListPage} />
					<Route exact path={`/${paths.ALBUM}`} component={routes.AlbumPage} />
					<Route exact path={`/${paths.MAIL_DETAIL}`} component={routes.MailDetailPage} />
					<Route exact path={`/${paths.CONFIG}`} component={routes.Config} />
					<Route exact path={`/${paths.TEST}`} component={routes.Test} />
					<Route exact path="/ChatPage" component={routes.ChatPage} />
					<Redirect exact from="/" to={`/${paths.MAIL_LIST}`} />
					<Redirect exact from={`/${paths.ROOT}`} to={`/${paths.MAIL_LIST}`} />
				</IonRouterOutlet>
			</AppShell>
		</IonReactRouter>
	);
}

export default AppRouter;
