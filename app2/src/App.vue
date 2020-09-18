<template>
	<div>
		<router-view />
	</div>
</template>
<script>
import Vue from 'vue';
export default {
	name: "App",
	props: [
		'history', 'app2Store'
	],
	mounted() {
		//入口文件有规定createHashHistory为默认导航模式，
		//但由于无法覆盖vue-router实例，且实例有许多实用钩子
		//所以在vue实例中新添加一个$baseRouter，值为入口文件中传过来的createHashHistory
		//若vue-router实例的mode为hash，则导航使用哪一个都可以，若为history模式，则导航请使用$baseRouter
		Vue.prototype.$baseRouter = this.history;
	},
};
</script>
<style>
</style>
