/**
 * single-spa启动的路由配置
 */
import React from 'react';
import {Provider} from 'react-redux';
import { Router, Switch, Route } from 'dva/router';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import './index.css';
import SiderLayout from './layout/siderLayout';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn'); 



class RouterConfig extends React.Component {
	componentDidCatch(err) {
		console.log('err', err)
	}
	render() {
		const {history, mainStore} = this.props;
		return (
			<Provider store={mainStore}>
				<Router history={history}>
					<Switch>
						<ConfigProvider locale={zhCN}>
							<Route path="/" component={SiderLayout} />
						</ConfigProvider>						
					</Switch>
				</Router>
			</Provider>			
		)
	}
}

export default RouterConfig;
