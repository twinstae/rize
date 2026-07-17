import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Config from '../pages/Config';
import MailDetailPage from '../pages/MailDetailPage';
import MailListPage from '../pages/MailListPage';
import AlbumPage from '../pages/AlbumPage';
import Test from '../test/Test';
import ChatPage from '../pages/ChatPage';
import { LeftMenu, MAIN_CONTENT_ID } from '../components/LeftDrawer';
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
		<IonApp className="bg-base-100">
			<IonReactRouter>
				<LeftMenu />
				<IonRouterOutlet id={MAIN_CONTENT_ID} className="mail-main-content min-h-dvh min-w-0 overflow-x-hidden bg-base-100">
					<Route exact path={`/${paths.MAIL_LIST}`} component={routes.MailListPage} />
					<Route exact path={`/${paths.ALBUM}`} component={routes.AlbumPage} />
					<Route exact path={`/${paths.MAIL_DETAIL}`} component={routes.MailDetailPage} />
					<Route exact path={`/${paths.CONFIG}`} component={routes.Config} />
					<Route exact path={`/${paths.TEST}`} component={routes.Test} />
					<Route exact path="/ChatPage" component={routes.ChatPage} />
					<Redirect exact from="/" to={`/${paths.MAIL_LIST}`} />
					<Redirect exact from={`/${paths.ROOT}`} to={`/${paths.MAIL_LIST}`} />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
}

export default AppRouter;
