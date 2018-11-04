import React, { Component } from 'react';
import { Row, Col, List, Avatar, Icon, Card } from 'antd';

const listData = [];
listData.push({
    href: 'http://ant.design',
    title: `ant design part 00`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    cost: 0
});
listData.push({
    href: 'http://ant.design',
    title: `ant design part 01`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '一个完整的区块链入门整理，吐血推荐！！！ 入门介绍与原理： 一、比特币 1.比特币白皮书 这是一切的开始 2.精通比特币 讲比特币很详细的一本书，看完基本对比特币的认识就清楚了。 3.TheProof-of-Work Concept PoW机制理论介绍，英文 4.比特币的原理及运...',
    cost: 5
});
listData.push({
    href: 'http://ant.design',
    title: `ant design part 02`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '区块链作为一种架构设计的实现，与基础语言或平台等差别较大。区块链是加密货币背后的技术，是当下与VR虚拟现实等比肩的热门技术之一，本身不是新技术，类似Ajax，可以说它是一种技术架构，所以我们从架构设计的角度谈谈区块链的技术实现。 无论你擅长什么编程语言，都能够参考这种设计去实现一款区块链产品。与...',
    cost: 5
});
listData.push({
    href: 'http://ant.design',
    title: `ant design part 03`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    cost: 0
});
listData.push({
    href: 'http://ant.design',
    title: `ant design part 04`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    cost: 0
});
listData.push({
    href: 'http://ant.design',
    title: `ant design part 05`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    cost: 0
});

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
 );

export default class Home extends Component{
    render(){
        return (
            <div className="home">
            <Row gutter={16}>
                <Col push={1} span={15}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 380 }} className="content-warp">
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 5,
                        }}
                        dataSource = { listData }
                        footer={<div><b>ant design</b> footer part</div>}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText type="pound" text="免费" />,
                                    <IconText type="star-o" text="156" />,
                                    <IconText type="like-o" text="156" />,
                                    <IconText type="message" text="2" />
                            ]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                    </div>
                </Col>
                <Col offset={1} span={6}>
                    <Card title="贡献排行" style={{ width: 400 }}>
                        1        xiaowei01 <br/>
                        2        xiaowei02 <br/>
                        3        xiaowei03 <br/>
                        4        xiaowei04 <br/>
                        5        xiaowei05 <br/>
                        6        xiaowei06 <br/>
                    </Card>
                </Col>
            </Row>
            </div>
        )
    }
}