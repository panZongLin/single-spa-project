import React, {lazy} from 'react';

import IndexPage from '../pages/indexPage';
import App1Page from '../pages/app1Page';

const routerConfig = [
  {
    path: '/',
    component: IndexPage
  },
  {
    path: '/App1',
    component: App1Page
  }
]

export default routerConfig;