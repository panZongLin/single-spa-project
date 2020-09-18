import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
//这里好像固定是root.component这个名字
import Root from './root.component'; 

const reactLifecycles = singleSpaReact({
	React,
	ReactDOM,
	rootComponent: Root,
	domElementGetter
});

export function bootstrap(props) {
	return reactLifecycles.bootstrap(props);
}

export function mount(props) {
	document.body.classList.add('global-main-style');
	return reactLifecycles.mount(props);
}

export function unmount(props) {
	document.body.classList.remove('global-main-style');
	return reactLifecycles.unmount(props);
}

function domElementGetter() {
	// Make sure there is a div for us to render into
	let el = document.getElementById('portal_Root');
	if (!el) {
		el = document.createElement('div');
		el.id = 'portal_Root';
		document.body.appendChild(el);
	}

	return el;
}
