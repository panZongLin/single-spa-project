//import './set-public-path'
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';

Vue.use(Antd);
Vue.config.productionTip = false;

//正常启动
if (!window.singleSpaNavigate) {
    new Vue({
		el: "#app",
		router,
		store,
		render: h => h(App)
	})
}


//singleSpa启动
const vueLifecycles = singleSpaVue({
	Vue,
	appOptions: {
		el: domElementGetter(), 
		render(h) {
			return h(App, {
				props: {
					history: this.history,
					app2Store: this.app2Store
				},
			});
		},
		router,
		store
	}
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

	return '#main_Root';
}

export function bootstrap(props){
	return vueLifecycles.bootstrap(props);
}

export function mount(props){
	document.body.classList.add('global-app2-style');
	return vueLifecycles.mount(props);
}

export function unmount(props){
	document.body.classList.remove('global-app2-style');
	return vueLifecycles.unmount(props);
}