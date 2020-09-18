import React, { Suspense, Fragment } from 'react';
import { Route, Link, Switch, Redirect } from 'dva/router';
import {
    Layout,
    Menu,
    Breadcrumb,
} from 'antd';
import {
    HomeOutlined,
    BookOutlined,
} from '@ant-design/icons';

import ErrorBoundary from './errorBoundary';
import menuConfig from '../config/menu';
import routerConfig from '../config/router';
import styles from './siderLayout.css';

import Mainpage from '../pages/mainpage';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const ComponentLoading = 
    <div style={{ margin: '0 auto' }}>
        <h1>组件加载中...</h1>
    </div>

class SiderLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            breadcrumbArr: []
        }
        this.iconComponent = {
            'HomeOutlined': <HomeOutlined />,
            'BookOutlined': <BookOutlined />
        }
    }
    componentDidMount() {
        const pathname = this.props.location.pathname;
        this.saveBread(pathname);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            const pathname = nextProps.location.pathname;
            this.saveBread(pathname);
        }
    }

    saveBread = (pathname) => {
        this.setState({
            breadcrumbArr: pathname.split('/').filter((t) => t !== '')
        });
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    renderMenu = (menuConfig)=> {
        return(
            <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
                {menuConfig && menuConfig.map((item, index) => {
                    if (!item.sub) {
                        return (
                            <Menu.Item key={index}>
                                {this.iconComponent[item.icon]}
                                <span><Link to={item.to}>{item.title}</Link></span>
                            </Menu.Item>
                        )
                    } else {
                        return (
                            <SubMenu
                                key={index}
                                title={<span>{this.iconComponent[item.icon]}{item.title}</span>}
                            >
                                {item.sub.map((itm, idx) => {
                                    return (
                                        <Menu.Item key={'sub' + idx}>
                                            <Link to={itm.to}>{itm.title}</Link>
                                        </Menu.Item>
                                    )
                                })}
                            </SubMenu>
                        )
                    }
                })}
            </Menu>
        )
    }

    renderBreadcrumb = (breadcrumbArr)=> {
        return(
            <Fragment>
                <Breadcrumb>
                    {breadcrumbArr.map((item, index) => {
                        return (
                            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                        )
                    })}
                </Breadcrumb>
            </Fragment>
        )
    }

    renderRouter = (routerConfig)=> {
        return(
            <ErrorBoundary>
                <Suspense fallback={ComponentLoading}>
                    <Switch>
                        {routerConfig && routerConfig.map((item, index) => {
                            if (item.path == '/') {
                                return (
                                    <Route key={item.path} exact path={item.path} component={item.component} />
                                )
                            }
                            return (
                                <Route key={item.path} path={item.path} component={item.component} />
                            )
                        })}
                        {/* <Redirect to="/" />  */}
                    </Switch>
                </Suspense>
            </ErrorBoundary>
        )
    }

    render() {
        return (
            <Layout className={styles.layout}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className={styles.logo} />
                    {/**菜单 */}                   
                    {this.renderMenu(menuConfig)}                   
                </Sider>
                <Layout>
                    <Header className={styles.header}>
                        {/**面包屑 */}
                        {this.renderBreadcrumb(this.state.breadcrumbArr)}                      
                    </Header>
                    <Content className={styles.contentWrap}>
                        <div className={styles.content}>
                            {/**路由*/}
                            {window.singleSpaNavigate 
                                ?   <ErrorBoundary>
                                        <Suspense fallback={ComponentLoading}>
                                            <Mainpage />
                                        </Suspense>                               
                                    </ErrorBoundary>
                                :   this.renderRouter(routerConfig)
                            }                                             
                        </div>
                    </Content>
                    <Footer className={styles.footer}>底部组件</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default SiderLayout;