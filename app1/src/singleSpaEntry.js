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

function domElementGetter() {

	let el = document.getElementById('main_Root');
	if (!el) {
		el = document.createElement('div');
		el.id = 'main_Root';
		document.body.appendChild(el);
	}
	//当直接访问子应用时，主应用尚未加载完毕
	let timer = null;
	timer = setInterval(() => {
		if (document.querySelector('#main_Root_Wrap')) {
			document.querySelector('#main_Root_Wrap').appendChild(el);
			clearInterval(timer);
		}
	}, 500);

	return el;
}

export function bootstrap(props) {
	return reactLifecycles.bootstrap(props);
}

export function mount(props) {
	document.body.classList.add('global-app1-style');
	return reactLifecycles.mount(props);
}

export function unmount(props) {
	document.body.classList.remove('global-app1-style');
	return reactLifecycles.unmount(props);
}
