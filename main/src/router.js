/**
 * 正常启动的路由配置
 */
import React from 'react';
import { Router, Switch, Route } from 'dva/router';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import './index.css';
import SiderLayout from './layout/siderLayout';
        
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn'); 



const RouterConfig = ({history})=> {
    return(
        <Router history={history}>
            <Switch>
                <ConfigProvider locale={zhCN}>
                    <Route path="/" component={SiderLayout} />
                </ConfigProvider>						
            </Switch>
        </Router>	
    )
}


export default RouterConfig;
