import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import App2Page from '../views/App2Page.vue';



const routes = [
	{
		path: '/',
		name: '',
		component: App2Page
	},
	{
		path: '/App2',
		name: 'App2',
		component: App2Page
	},
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
