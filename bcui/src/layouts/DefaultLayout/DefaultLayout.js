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
                <Content>
                    <div style={{padding: 80, minHeight: 500 }} className="content-warp">
                        <Route path={this.props.match.url+'/'} component={Home} exact/>
                        <Route path={this.props.match.url+'/publish'} component={Publish} />
                        <Route path={this.props.match.url+'/account'} component={Account} />
                        </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by CJK
                </Footer>
            </Layout>
        )
    }
}