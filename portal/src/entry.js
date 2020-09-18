import * as singleSpa from 'single-spa';
import { loadApp } from './util';

export const project_config = [
	{
		isBase: true,
		name: 'main',
		hashPrefix: '/',
		entry: 'http://localhost:8001/singleSpaEntry.js',
		store: 'http://localhost:8001/store.js'
	},
	//...
];

async function init() {
	//Unable to dynamically transpile ES module
	//A loader plugin needs to be configured via `SystemJS.config({ transpiler: 'transpiler-module' })`.
	SystemJS.config({ transpiler: 'transpiler-module' }) 

	const loadingPromises = [];
	//主应用
	loadingPromises.push(
		loadApp(
			'main',
			'/',
			'http://localhost:8001/singleSpaEntry.js',
			'http://localhost:8001/store.js'
		)
	);

	
	loadingPromises.push(
		loadApp(
			'app1',
			['/', '/App1'],
			'http://localhost:8002/singleSpaEntry.js',
			'http://localhost:8002/store.js'
		)
	);
	loadingPromises.push(
		loadApp(
			'app2',
			'/App2',
			'http://localhost:8003/singleSpaEntry.js',
			'http://localhost:8003/store.js'
		)
	);


	await Promise.all(loadingPromises);

	singleSpa.start();
}

init();
