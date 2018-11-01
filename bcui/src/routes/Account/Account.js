import React, { Component } from 'react';
import { Tabs, Row, Col, Card, Icon, Avatar } from 'antd';
// import { Route, Link } from 'react-router-dom';
const TabPane = Tabs.TabPane;
// import overview from './overview.js';
// import house from './house.js';
// import wallet from './wallet.js';
const { Meta } = Card;

function callback(key) {
  console.log(key);
}
export default class Account extends Component{
    render(){
        return (
             <div id="LoginUser">
                <div>
    <Row gutter={20}>
      <Col span={1} offset={4}>
      <Card
    style={{ width: 300 }}
    cover={<img alt="touxiang" src={require('../../image/card.png')} />}
    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
  >
    <Meta
      avatar={<Avatar src={require('../../image/touxiang.jpg')} />}
      title="Card title"
      description="This is the description"
    />
  </Card>
      </Col>
      <Col span={9} offset={3}>
      <Tabs defaultActiveKey="1" onChange={callback}  size="large" type="card" >
        <TabPane tab="动态 " key="1">Content of Tab Pane 1</TabPane>
        <TabPane tab="空间" key="2">
        <Tabs defaultActiveKey="2" onChange={callback}  size="large">
          <TabPane tab="个人资料 " key="21">Content of Tab Pane 1</TabPane>
          <TabPane tab="作品" key="22">Content of Tab Pane 2</TabPane>
          <TabPane tab="购买" key="23">Content of Tab Pane 3</TabPane>
          <TabPane tab="收藏" key="24">Content of Tab Pane 4</TabPane>
          <TabPane tab="提问" key="25">Content of Tab Pane 5</TabPane>
          <TabPane tab="回答" key="26">Content of Tab Pane 6</TabPane>
        </Tabs> 
        </TabPane>
        <TabPane tab="钱包" key="3">Content of Tab Pane 3</TabPane>
        <TabPane tab="Tab 4" key="4">Content of Tab Pane 4</TabPane>
        <TabPane tab="Tab 5" key="5">Content of Tab Pane 5</TabPane>
        <TabPane tab="Tab 6" key="6">Content of Tab Pane 6</TabPane>
      </Tabs>
      </Col>
    </Row>
    <Row>
      <Col span={8}></Col>
    </Row>
    <Row>
      <Col span={6}></Col>
    </Row>
  </div>
            </div>
        )
    }
}