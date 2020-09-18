import React, { lazy } from 'react';
import Mainpage from '../pages/mainpage';
//const Mainpage = lazy(() => import('../pages/mainpage'));

const routerConfig = [
	{
		path: '/',
		component: Mainpage
	},
	{
		path: '/App1',
		component: Mainpage
	},
	{
		path: '/App2',
		component: Mainpage
	},
]

export default routerConfig;