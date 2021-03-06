/**
 * sigle-spa启动的路由配置
 */
import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import { Router, Switch, Route } from 'dva/router';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import './index.css';
import ErrorBoundary from './config/errorBoundary';
import routerConfig from './config/router';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn'); 



const ComponentLoading = 
    <div style={{ margin: '0 auto' }}>
        <h1>组件加载中...</h1>
    </div>


class RouterConfig extends React.Component {
	componentDidCatch(err) {
		console.log('err', err)
	}
	render() {
		const {history, app1Store} = this.props;
		//console.log('app1 RouterEntry', this.props)
		return (
			<Provider store={app1Store}>
				<Router history={history}>
					<ErrorBoundary>
						<Suspense fallback={ComponentLoading}>
							<Switch>
								<ConfigProvider locale={zhCN}>
									{routerConfig.map((item)=> {
										return(
											<Route 
												key={item.path} 
												path={item.path} 
												exact 
												component={item.component} 
											/>
										)										
									})}
								</ConfigProvider>						
							</Switch>
						</Suspense>
					</ErrorBoundary>
				</Router>
			</Provider>			
		)
	}
}

export default RouterConfig;
