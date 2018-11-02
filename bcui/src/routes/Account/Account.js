/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Progress, Table, Divider,Timeline, Button, Tabs, Row, Col, Card, Icon, Avatar ,Input, InputNumber, Popconfirm, Form } from 'antd';

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
             <div id="LoginUser">
                <div>
    <Row gutter={20}>
      <Col span={2} offset={4}>
      <Card
    style={{ width: 300 }}
    cover={<img alt="touxiang" src={require('../../image/card.png')} />}
    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
  >
    <Meta
      avatar={<Avatar src={require('../../image/touxiang.jpg')} />}
      title="未来学院"
      description="一个去中心化的知识分享社区"
    />
  </Card>
      </Col>
      <Col span={11} offset={3}>
        <Tabs id='tabperson' defaultActiveKey="1" onChange={callback}  size="large">
          <TabPane tab="个人主页 " key="1">
          <Card
              title="你的动态"
              extra={<a href="https://www.baidu.com/">More</a>}
              style={{ width: 800 }}
            >
                <Col span={1} offset={0}>
                  <Card
                  title="阅读"
                  style={{ width: 150 }}
                ><p> 0</p>
              </Card></Col>
              <Col span={1} offset={5}>
                  <Card
                  title="访客"
                  style={{ width: 150  }}
                ><p> 0</p>
              </Card></Col>
              <Col span={1} offset={5}>
                  <Card
                  title="点赞"
                  style={{ width: 150 }}
                ><p> 0</p>
              </Card></Col>
              <Col span={1} offset={5}>
                  <Card
                  title="获赞"
                  style={{ width: 150 }}
                ><p> 0</p>
              </Card></Col>
          </Card>
          <Divider />
          <Card
              title="The Future College"
              extra={<a href="https://www.baidu.com/">More</a>}
              style={{ width: 800 }}
              textAlign = 'left'
            >
              <p>The foundation of The Future College</p>
              <p>the white paper of Future College</p>
          </Card>
          <Divider >你的贡献</Divider>
          <Card
              title="Fighting"
              extra={<a href="https://www.baidu.com/">More</a>}
              style={{ width: 800 }}
            >
                <Col span={1} offset={0}>
                  <Card
                  title="发表"
                  style={{ width: 150 }}
                ><p> 0</p>
              </Card></Col>
              <Col span={1} offset={5}>
                  <Card
                  title="提问"
                  style={{ width: 150 }}
                ><p> 0</p>
              </Card></Col>
              <Col span={1} offset={5}>
                  <Card
                  title="回答"
                  style={{ width: 150 }}
                ><p> 0</p>
              </Card></Col>
              <Col span={1} offset={5}>
                  <Card
                  title="评论"
                  style={{ width: 150 }}
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
              style={{backgroundColor: '#fffaf0', width: 800}}
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
              style={{ backgroundColor: '#fffaf0',width: 800 }}
              
            >
              <p>How the threshold voltage depend on the size of the transistor</p>
              <p>What problem does this feature solve</p>
          </Card>
          <Divider />
          <Card
              hoverable ={true } 
              title=" transistor"
              extra={<a href="https://www.baidu.com/">More</a>}
              style={{ backgroundColor: '#fffaf0',width: 800 }}
              
            >
              <p>How the threshold voltage depend on the size of the transistor</p>
              <p>What problem does this feature solve</p>
          </Card>
          <Divider />
          <Card
              hoverable ={true } 
              title=" transistor"
              extra={<a href="https://www.baidu.com/">More</a>}
              style={{backgroundColor: '#fffaf0', width: 800 }}
              
            >
              <p>How the threshold voltage depend on the size of the transistor</p>
              <p>What problem does this feature solve</p>
          </Card>
          <Divider />
          <Card
              hoverable ={true } 
              title=" transistor"
              extra={<a href="https://www.baidu.com/">More</a>}
              style={{backgroundColor: '#fffaf0', width: 800 }}
              
            >
              <p>How the threshold voltage depend on the size of the transistor</p>
              <p>What problem does this feature solve</p>
          </Card>
          <Divider />
          <Card
              hoverable ={true } 
              title=" transistor"
              extra={<a href="https://www.baidu.com/">More</a>}
              style={{ backgroundColor: '#fffaf0',width: 800 }}
              
            >
              <p>How the threshold voltage depend on the size of the transistor</p>
              <p>What problem does this feature solve</p>
          </Card>
          <Divider />
          <Card
              hoverable ={true } 
              title=" transistor"
              extra={<a href="https://www.baidu.com/">More</a>}
              style={{backgroundColor: '#fffaf0', width: 800 }}
              
            >
              <p>How the threshold voltage depend on the size of the transistor</p>
              <p>What problem does this feature solve</p>
          </Card>
          </TabPane>
          <TabPane tab="购买" key="4">Content of Tab Pane 3</TabPane>
          <TabPane tab="收藏" key="5">Content of Tab Pane 4</TabPane>
          <TabPane tab="Q&A" key="6">Content of Tab Pane 5</TabPane>
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