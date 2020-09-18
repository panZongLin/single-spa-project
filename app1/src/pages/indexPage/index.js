import React, {useState} from 'react';
import {
	Button
} from 'antd';
import styles from './index.less'; 

const IndexPage = (props)=> {
	const mainStore = window.mainStore;
	const [A, setA] = useState(mainStore.getState().model1.A);
	//console.log('IndexPage', props);

	const add=()=> {
		mainStore.dispatch({
			type: 'model1/add',
			payload: {A: A + 1}
		})
		setTimeout(()=>{
			setA(window.mainStore.getState().model1.A)
		}, 0)
	}

	const addB=()=> {
		const app1Store = window.app1Store;
		app1Store.dispatch({
			type: 'model2/up',
			payload: {B: app1Store.getState().model2.B + 3}
		})
	}

	return (
		<div>
			<ul>
				<li>portal 入口文件，注册，启动shingle-spa应用</li>
				<li>main 主应用 整体布局，导航菜单，内容区固定标签id，供子应用接入</li>
				<li>app1 子应用1，匹配路径 /和/App1</li>
				<li>app2 子应用2 匹配路径 /App2</li>
			</ul>
			<h2>主应用main的model1.A: {A}</h2>
			<Button type="primary" onClick={add} style={{marginBottom: 10}}>
				A + 1
			</Button>
			<br />
			<Button type="primary" onClick={addB}>
				子应用app1的model2.B + 3
			</Button>
		</div>		
	);
}

export default IndexPage;
