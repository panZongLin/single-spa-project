import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
	state: {
		C: 1
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})

export default Store;
window.app2Store = Store;