<template>
	<div>
		<img alt="Vue logo" src="../assets/logo.png" />
		<h2 class="color">store.state.C: {{C}}</h2>
		<a-button type="primary" @click="add"> 
			主应用main的model1.A + 3
		</a-button>
		<br />
		<a-button type="primary" @click="jump" :style="{marginTop: '10px'}">
			跳转到App1
		</a-button>
	</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
	name: "App2Page",
	computed: {
		...mapState({
			C: state => state.C,
		}),
	},
	methods: {
		add: function() {
			const mainStore = window.mainStore;
			mainStore.dispatch({
				type: 'model1/add',
				payload: {A: mainStore.getState().model1.A + 3}
			})
		},
		jump: function() {
			//this.$router.push('/App1')
			this.$baseRouter.push('/App1')
		}
	},
};
</script>

<style scoped>
	.color {
		color: red;
		margin-bottom: 10px;
	}
</style>
