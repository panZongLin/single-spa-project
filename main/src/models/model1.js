
export default {
	namespace: 'model1',
	state: {
		A: 1
	},
	// subscriptions: {
	// 	setup({ dispatch, history }) { 
	// 	},
	// },
	effects: {
		// *fetch({ payload }, { call, put }) { 
		// 	yield put({ type: 'save' });
		// },
	},
	reducers: {
		add(state, action) {
			return { ...state, A: action.payload.A};
		},
	},

};
