<<<<<<< HEAD
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
//import './DefaultLayout.less'
import { Route, Link } from 'react-router-dom';
import Home from '../../routes/Home/Home.js';
import Publish from '../../routes/Publish/Publish.js';
import Account from '../../routes/Account/Account.js';
import Article1 from '../../routes/Articles/article1.js';
import Article2 from '../../routes/Articles/article2.js';
import Article3 from '../../routes/Articles/article3.js';
import Article4 from '../../routes/Articles/article4.js';
import Article5 from '../../routes/Articles/article5.js';

const { Header, Content, Footer } = Layout;

export default class DefaultLayout extends Component{
    state = {
        current: 'home',
    }
    handleClick=(e)=>{ //点击事件
        this.setState({current:e.key});
    }
    render(){
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                        onClick={this.handleClick}
                    >
                        <Menu.Item key="1">
                            <Link  to="/home">社区首页</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link  to="/home/publish">发布文章</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link  to="/home/account">个人信息</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }} className="content-warp">
                        <Route path={this.props.match.url+'/'} component={Home} exact/>
                        <Route path={this.props.match.url+'/publish'} component={Publish} />
                        <Route path={this.props.match.url+'/account'} component={Account} />
                        <Route path={this.props.match.url+'/article/1'} component={Article1} />
                        <Route path={this.props.match.url+'/article/2'} component={Article2} />
                        <Route path={this.props.match.url+'/article/3'} component={Article3} />
                        <Route path={this.props.match.url+'/article/4'} component={Article4} />
                        <Route path={this.props.match.url+'/article/5'} component={Article5} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>s
                    Ant Design ©2018 Created by CJK
                </Footer>
            </Layout>
        )
    }
=======
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
//import './DefaultLayout.less'
import { Route, Link } from 'react-router-dom';
import Home from '../../routes/Home/Home.js';
import Publish from '../../routes/Publish/Publish.js';
import Account from '../../routes/Account/Account.js';

const { Header, Content, Footer } = Layout;

export default class DefaultLayout extends Component{
    state = {
        current: 'home',
    }
    handleClick=(e)=>{ //点击事件
        this.setState({current:e.key});
    }
    render(){
        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                        onClick={this.handleClick}
                    >
                        <Menu.Item key="1">
                            <Link  to="/home">社区首页</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link  to="/home/publish">发布文章</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link  to="/home/account">个人信息</Link>
                        </Menu.Item>
                        
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }} className="content-warp">
                        <Route path={this.props.match.url+'/'} component={Home} exact/>
                        <Route path={this.props.match.url+'/publish'} component={Publish} />
                        <Route path={this.props.match.url+'/account'} component={Account} />
                        <Route path={this.props.match.url+'/article/1'} component={Article1} />
                        <Route path={this.props.match.url+'/article/2'} component={Article2} />
                        <Route path={this.props.match.url+'/article/3'} component={Article3} />
                        <Route path={this.props.match.url+'/article/4'} component={Article4} />
                        <Route path={this.props.match.url+'/article/5'} component={Article5} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>s
                    Ant Design ©2018 Created by CJK
                </Footer>
            </Layout>
        )
    }
>>>>>>> c30ae2813737accacd29b8908585d0c098d59104
}