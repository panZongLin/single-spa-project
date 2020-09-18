
export default {
	namespace: 'model2',
	state: {
		B: 1
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
		up(state, action) {
			return { ...state, ...action.payload};
		},
	},

};
