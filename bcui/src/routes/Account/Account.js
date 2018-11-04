/* eslint-disable no-script-url */
/* eslint-disable no-sparse-arrays */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {Tooltip, Progress, Table, Divider,Timeline, Button, Tabs, Row, Col, Card, Icon, Avatar ,Input, InputNumber, Popconfirm, Form } from 'antd';

const TabPane = Tabs.TabPane;
const data = [{
  key: '1',
  na: '昵称',
  j: '未来学院',
}, {
  key: '2',
  na: '性别',
  j: '男',
}, {
  key: '3',
  na: '个人简介',
  j: '不是渣就是坏的交大诈骗团伙',
}, {
  key: '3',
  na: '身份证ID（个人实名认证）',
  j: '********************************',
}, {
  key: '3',
  na: '真实姓名（个人实名认证）',
  j: '***',
}, {
  key: '3',
  na: '个人邮箱/联系方式',
  j: 'asd@sjtu.edu.cn',
}, {
  key: '3',
  na: '贡献度',
  j: 32,
}];
const FormItem = Form.Item;
const EditableContext = React.createContext();
const walletcolumns = [{
  title: '序号',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '哈希值',
  dataIndex: 'hash',
  key: 'hash',
}, {
  title: '时间',
  dataIndex: 'time',
  key: 'time',
  },  {
    title: '转出地址',
    dataIndex: 'addressout',
    key: 'addressout',
  },  {
    title: '转入地址',
    dataIndex: 'addressin',
    key: 'addressin',
  }, {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
  },  ];
  const walletdata = [{
    key: '1',
    name: '1',
    hash: '0xb289b0...fb522985',
    time: '2018/11/1',
    addressout: '0xb28sdf0sdfb522985',
    addressin: '0xb2asd07524b522985',
    amount: '88 FFT'
  }, {
    key: '2',
    name: '2',
    hash: '0xb275456HGHfb522985',
    time: '2018/11/1',
    addressout: '0x456XSSf0sdfb522985',
    addressin: '0x456AA524bDFH562985',
    amount: '458 FFT'
  }, {
    key: '3',
    name: '3',
    hash: '0xb289b354HHHb522985',
    time: '2018/11/2',
    addressout: '0xb45645SAASF2SF22985',
    addressin: '0xb2afsdgc4b5555985',
    amount: '778 FFT'
  }, {
    key: '2',
    name: '2',
    hash: '0xb275456HGHfb522985',
    time: '2018/11/1',
    addressout: '0x456XSSf0sdfb522985',
    addressin: '0x456AA524bDFH562985',
    amount: '458 FFT'
  }, {
    key: '3',
    name: '3',
    hash: '0xb289b354HHHb522985',
    time: '2018/11/2',
    addressout: '0xb45645SAASF2SF22985',
    addressin: '0xb2afsdgc4b5555985',
    amount: '778 FFT'
  }, {
    key: '2',
    name: '2',
    hash: '0xb275456HGHfb522985',
    time: '2018/11/1',
    addressout: '0x456XSSf0sdfb522985',
    addressin: '0x456AA524bDFH562985',
    amount: '458 FFT'
  }, {
    key: '3',
    name: '3',
    hash: '0xb289b354HHHb522985',
    time: '2018/11/2',
    addressout: '0xb45645SAASF2SF22985',
    addressin: '0xb2afsdgc4b5555985',
    amount: '778 FFT'
  }, {
    key: '2',
    name: '2',
    hash: '0xb275456HGHfb522985',
    time: '2018/11/1',
    addressout: '0x456XSSf0sdfb522985',
    addressin: '0x456AA524bDFH562985',
    amount: '458 FFT'
  }, {
    key: '3',
    name: '3',
    hash: '0xb289b354HHHb522985',
    time: '2018/11/2',
    addressout: '0xb45645SAASF2SF22985',
    addressin: '0xb2afsdgc4b5555985',
    amount: '778 FFT'
  }, {
    key: '2',
    name: '2',
    hash: '0xb275456HGHfb522985',
    time: '2018/11/1',
    addressout: '0x456XSSf0sdfb522985',
    addressin: '0x456AA524bDFH562985',
    amount: '458 FFT'
  }, {
    key: '3',
    name: '3',
    hash: '0xb289b354HHHb522985',
    time: '2018/11/2',
    addressout: '0xb45645SAASF2SF22985',
    addressin: '0xb2afsdgc4b5555985',
    amount: '778 FFT'
  }, {
    key: '2',
    name: '2',
    hash: '0xb275456HGHfb522985',
    time: '2018/11/1',
    addressout: '0x456XSSf0sdfb522985',
    addressin: '0x456AA524bDFH562985',
    amount: '458 FFT'
  }, {
    key: '3',
    name: '3',
    hash: '0xb289b354HHHb522985',
    time: '2018/11/2',
    addressout: '0xb45645SAASF2SF22985',
    addressin: '0xb2afsdgc4b5555985',
    amount: '778 FFT'
  }, {
    key: '2',
    name: '2',
    hash: '0xb275456HGHfb522985',
    time: '2018/11/1',
    addressout: '0x456XSSf0sdfb522985',
    addressin: '0x456AA524bDFH562985',
    amount: '458 FFT'
  }, {
    key: '3',
    name: '3',
    hash: '0xb289b354HHHb522985',
    time: '2018/11/2',
    addressout: '0xb45645SAASF2SF22985',
    addressin: '0xb2afsdgc4b5555985',
    amount: '778 FFT'
  }, {
    key: '2',
    name: '2',
    hash: '0xb275456HGHfb522985',
    time: '2018/11/1',
    addressout: '0x456XSSf0sdfb522985',
    addressin: '0x456AA524bDFH562985',
    amount: '458 FFT'
  }, {
    key: '3',
    name: '3',
    hash: '0xb289b354HHHb522985',
    time: '2018/11/2',
    addressout: '0xb45645SAASF2SF22985',
    addressin: '0xb2afsdgc4b5555985',
    amount: '778 FFT'
  }];


const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
const { Meta } = Card;
function callback(key) {
  console.log(key);
}
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [{
      title: '个人资料',
      dataIndex: 'na',
      key: 'na',
      width: '33.3%',
      editable: true,
    }, {
      title: '',
      dataIndex: 'j',
      key: 'yourkey',
      width: '33.3%',
      editable: true,
    },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        // eslint-disable-next-line no-script-url
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>Edit</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Table
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName="editable-row"
      />
    );
  }
}
export default class Account extends Component{
    state = {
        reverse: false,
    }
    handleClick = () => {
        this.setState({ reverse: !this.state.reverse });
    }
    render(){
      return (
        <div id="Account">
        <Row gutter={16}>
            <Col push={1} span={5}>
                <Card
                    //style={{ width: 300 }}
                    cover={<img alt="avatar" src={require('../../image/card.png')} />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta
                    avatar={<Avatar src={require('../../image/avatar.jpg')} />}
                    title="未来学院"
                    description="一个去中心化的知识分享社区"
                    />
                </Card>
            </Col>
            <Col span={16} offset={1}>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }} className="content-warp">
            <Tabs id='tabperson' defaultActiveKey="1" onChange={callback}  size="large">
              <TabPane tab="个人主页 " key="1">
              <Card
                  title="你的动态"
                  extra={<a href="https://www.baidu.com/">More</a>}
                  >
                  <Col span={6}>
                      <Card
                          title="阅读"
                          ><p> 0</p>
                      </Card>
                  </Col>
                  <Col span={6}>
                      <Card
                      title="访客"
                      ><p> 0</p>
                  </Card></Col>
                  <Col span={6}>
                      <Card
                      title="点赞"
                      ><p> 0</p>
                  </Card></Col>
                  <Col span={6}>
                      <Card
                      title="获赞"
                      ><p> 0</p>
                      </Card>
                  </Col>
              </Card>
              <Divider />
              <Card
                  title="The Future College"
                  extra={<a href="https://www.baidu.com/">More</a>}
                  textAlign = 'left'
                  >
                  <p>The foundation of The Future College</p>
                  <p>the white paper of Future College</p>
              </Card>
              <Divider >你的贡献</Divider>
              <Card
                  title="Fighting"
                  extra={<a href="https://www.baidu.com/">More</a>}
                  >
                  <Col span={6}>
                      <Card
                      title="发表"
                      ><p> 0</p>
                  </Card></Col>
                  <Col span={6}>
                      <Card
                      title="提问"
                      ><p> 0</p>
                  </Card></Col>
                  <Col span={6}>
                      <Card
                      title="回答"
                      ><p> 0</p>
                  </Card></Col>
                  <Col span={6}>
                      <Card
                      title="评论"
                      ><p> 0</p>
                  </Card></Col>
              </Card>
              <Divider> 贡献度排名</Divider>
              <Progress percent={70} status="active"/>
              <Divider> history</Divider>
              <Timeline pending="Recording..." reverse={this.state.reverse}>
              <Timeline.Item>Create The Future College in 2018-09-01</Timeline.Item>
              <Timeline.Item>Create the first scheme in 2018-10-01</Timeline.Item>
              <Timeline.Item>Coding the first web 2018-11-01</Timeline.Item>
              </Timeline>
              <Button type="primary" style={{ marginTop: 16 }} onClick={this.handleClick}>Toggle Reverse</Button>
              </TabPane>
              <TabPane tab="个人资料 " key="2">      
              <EditableTable id='tabperson'/>
              </TabPane>
              <TabPane tab="作品" key="3">
              <Card
                  hoverable ={true } 
                  title="The Future College"
                  extra={<a href="https://www.baidu.com/">More</a>}
                  className = "card1"
                  >
                  <p>The foundation of The Future College</p>
                  <p>the white paper of Future College</p>
              </Card>
              <Divider />
              <Card
                  hoverable ={true } 
                  title=" transistor"
                  extra={<a href="https://www.baidu.com/">More</a>}
                  
                  >
                  <p>How the threshold voltage depend on the size of the transistor</p>
                  <p>What problem does this feature solve</p>
              </Card>
              <Divider />
              <Card
                  hoverable ={true } 
                  title=" transistor"
                  extra={<a href="https://www.baidu.com/">More</a>}
                  
                  >
                  <p>How the threshold voltage depend on the size of the transistor</p>
                  <p>What problem does this feature solve</p>
              </Card>
              <Divider />
              <Card
                  hoverable ={true } 
                  title=" transistor"
                  extra={<a href="https://www.baidu.com/">More</a>}
                  
                  >
                  <p>How the threshold voltage depend on the size of the transistor</p>
                  <p>What problem does this feature solve</p>
              </Card>
              <Divider />
              <Card
                  hoverable ={true } 
                  title=" transistor"
                  extra={<a href="https://www.baidu.com/">More</a>}
                  
                  >
                  <p>How the threshold voltage depend on the size of the transistor</p>
                  <p>What problem does this feature solve</p>
              </Card>
              <Divider />
              <Card
                  hoverable ={true } 
                  title=" transistor"
                  extra={<a href="https://www.baidu.com/">More</a>}
                  
                  >
                  <p>How the threshold voltage depend on the size of the transistor</p>
                  <p>What problem does this feature solve</p>
              </Card>
              <Divider />
              <Card
                  hoverable ={true } 
                  title=" transistor"
                  extra={<a href="https://www.baidu.com/">More</a>}
                  
                  >
                  <p>How the threshold voltage depend on the size of the transistor</p>
                  <p>What problem does this feature solve</p>
              </Card>
              </TabPane>
              <TabPane tab="收藏" key="4">Content of Tab Pane 4</TabPane>
              <TabPane tab="Q&A" key="5">Content of Tab Pane 5</TabPane>
              <TabPane tab="钱包" key="6">
                <Row gutter={16}>
                  <Col push={3} span={5}>
                      <Card
                          className='ico-card'
                          hoverable ={true } 
                          style={{backgroundColor: '#ffffff', width: 300}}
                          cover={<img id = 'ICOcard' alt="example" src={require('../../image/ICOcard.png')} />}
                      />
                  </Col>
                  <Col push={7} span={5} offset={1}>
                      <Card hoverable ={true } 
                          style={{backgroundColor: '#fff0f0', width: 300}}>
                          <Meta
                              avatar={<Avatar size={114} 
                              shape="square"
                              src={require('../../image/IC.png')}  />}
                              title="FFT WALLT"
                              description="0xb289b0b3e674e07c20b769f63391a8edfb522985"
                          />
                          <br />
                          <Row>
                              <Col span={1} offset={5}>
                                  <Button type="primary" size={"large"}>收款</Button>
                              </Col>
                              <Col span={1} offset={11}>
                                  <Button type="primary" size={"large"}>转账</Button>
                              </Col>
                          </Row>
                          <br />
                          <Col span={5} offset={3}>
                              <p font-size='50px'> 余额</p>
                          </Col>
                          <Tooltip title="prompt text">
                              <span>20180815 FFT</span>
                          </Tooltip>
                      </Card>
                  </Col>
                </Row>
              <Table columns={walletcolumns} dataSource={walletdata} />
              </TabPane>
              </Tabs> </div>
            </Col>
          </Row>
          </div>
      )
    }
}