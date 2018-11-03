import React, { Component } from 'react';
import './Publish.css';
import { Collapse, Input, InputNumber, Radio, Row, Col, Button} from 'antd';

const Panel = Collapse.Panel;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

export default class Publish extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            free: true,
            price: 1,
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeFree = this.onChangeFree.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.confirmAll = this.confirmAll.bind(this);
    }

    onChangeTitle(e){
        this.setState({title: e.target.value});
    }

    onChangeContent(e){
        this.setState({content: e.target.value});
    }

    onChangeFree(e){
        this.setState({free: e.target.value});
    }

    onChangePrice(value){
        this.setState({price: value});
    }

    confirmAll(e){
        var text = "标题： "+this.state.title+'    '
        var f = this.state.free===true ? "免费": "收费: "+this.state.price
        alert(text+f)
    }

    render(){
        return (
            <div id="Publish">
                <p className="title" >发布文章</p>
                <Collapse defaultActiveKey = {['1','2']}>
                    <Panel header="文章标题" key="1" className="panelHeader">
                        <Input 
                            id="textTitle" 
                            placeholder="Title" 
                            onChange={this.onChangeTitle}/>
                    </Panel>
                    <Panel header="正文" key="2" className="panelHeader">
                        <TextArea 
                            rows={20} 
                            placeholder="Content"
                            onChange={this.onChangeContent}
                            />
                    </Panel>
                    <Panel header="选项" key="3" className="panelHeader">
                        <p>是否付费？</p>
                        <RadioGroup
                            onChange={this.onChangeFree}
                            value = {this.state.free}>

                            <Radio value={true}>免费</Radio>
                            <Radio value={false}>付费</Radio>
                            <InputNumber
                                min={1}
                                max={10}
                                defaultValue={1}
                                disabled={this.state.free}
                                onChange={this.onChangePrice}
                                />
                        </RadioGroup>
                    </Panel>
                </Collapse>
                <Row
                    style={{height: 50}}>
                    <Col span={12}>
                        <Button 
                            type="primary" 
                            block 
                            className="button"
                            onClick={this.confirmAll}>
                            确认
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button 
                            type="danger" 
                            block 
                            className='button'>
                            取消
                        </Button>
                    </Col>
                </Row>
            </div>

        )
    }
}