import React from 'react';
import dva from 'dva';
import modelsArray from './models/modelsArray';
import RouterConfig from './router';

const app = dva();

app.use({});

modelsArray.forEach((model) => {
	app.model(model);
})


if (window.singleSpaNavigate) {
	app.router(()=><div />);
	app.start('#portal_Root');
	window.app1Store = app._store;
}else {
	app.router(RouterConfig);
	app.start('#root');
}

export default app._store;


