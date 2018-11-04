/* eslint-disable no-script-url */
/* eslint-disable no-sparse-arrays */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Component } from 'react';
import {Row, Col, Card, Icon, Avatar} from 'antd';

const { Meta } = Card;

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5002', protocol: 'http'});

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.get_content = this.get_content.bind(this);
    };

    state = {
        reverse: false,
        content: "no content"
    };

    handleClick = () => {
        this.setState({ reverse: !this.state.reverse });
    };
    
    // get_content = () => {
    //     var ipfsPath = "QmS2tz2zAuPTYY8A258ic7nquQTVQ3JH5Jq9bVd1iasGfY";
    //     // console.log(this.state.content);
    //     ipfs.files.cat(ipfsPath, function (err, file) {
    //         if (err) {
    //             throw err
    //         }
    //         console.log(this.state.content);
    //         console.log(file.toString('utf8'));
    //         this.setState({content: file.toString('utf8')});
    //     });
    // };

    get_content = (err, file) => {
        if (err) throw err;
        this.setState({content: file.toString('utf8')});
    };

    render() {
        // var response;
        // var request = new XMLHttpRequest();
        // const url = "https://ipfs.io/ipfs/QmWRr57RVE7fEhFr9YRgUp8acwa9TxDRJUeJBGPa78X2yQ";
        // request.open("GET", url, true);
        // request.send(null);
        // request.onreadystatechange = function() {  // log when ready
        //     if (request.readyState == 4) {
        //         response = request.responseText;
        //         console.log(response);
        //     }
        // };

        // setTimeout(5000);
        // console.log(request.responseText);
        // this.get_content();

        var ipfsPath = "QmVeFyDGoMUquTSB8kTxUfrMZojA4GuQ9dV6uVGYJw6ZLe";
        // ipfs.files.cat(ipfsPath, function (err, file) {
        //     if (err) {
        //         throw err
        //     }
        //     this.setState({content: file.toString('utf8')});
        //
        //     console.log(this.state.content);
        // });
        ipfs.files.cat(ipfsPath, this.get_content);
        console.log(this.state.content);

        return (
            <div>
            <Row gutter = {16}>
                <Col push = {1} span = {5}>
                    <Card
                    cover = {<img alt="avatar" src={require('../../image/card.png')} />}
                    actions = {[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                    >
                        <Meta
                        avatar = {<Avatar src={require('../../image/avatar.jpg')} />}
                        title = "未来学院"
                        description = "一个去中心化的知识分享社区"
                        />
                    </Card>
                </Col>
                <Col push = {1} span = {17}>
                <div style={{ background: '#fff', padding: 24, minHeight: 380 }} className="content-warp">
                    <h1> { this.state.content.split('\n')[0] } </h1>
                    <h3> author: {this.state.content.split('\n')[1] }</h3>
                    <p align="left">{ this.state.content.split('\n').slice(2).join('\n') } </p>
                </div>
                </Col>
            </Row>
            </div>
        );
    }
}
