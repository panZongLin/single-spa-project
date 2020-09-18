import React from 'react';
import { connect } from 'dva';
import {
	Button
} from 'antd';
import styles from './index.less'; 
import logo from '../../assets/react.jpg';

const App1page = (props)=> {
	//console.log('App1page', props);
	const {dispatch, history, model2} = props;

	const add=()=> {
		dispatch({
			type: 'model2/up',
			payload: {B: model2.B + 3}
		})
	}

	return (
		<div>
			<img src={logo} style={{width: 200}} />
			<h2 className={'color'}>props.model2.B: {model2.B}</h2>
			<Button type="primary" onClick={add}>
				B + 3
			</Button>
		</div>		
	);
}

export default connect(({ model2 }) => {
	return {
		model2
	}
})(App1page);
