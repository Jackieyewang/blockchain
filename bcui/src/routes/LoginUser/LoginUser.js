import React, { Component } from 'react';
import { Form, Row, Col, Card, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row type="flex" justify="center" align="middle">
                <Col>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <Card
                    style={{backgroundColor: '#fefefc'}}
                >
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: 300}} className="login-form" >
                        <FormItem>
                            {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '用户名不能为空' }],
                            })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                            rules: [{ required: true, message: '密码不能为空！' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                            })(
                            <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="/#/login">忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            <a href='/#/register'>注册</a>
                        </FormItem>
                    </Form>
                </Card>
                </Col>
            </Row>
        )
    }
}
  
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default class LoginUser extends Component{
    render(){
        return (
            <WrappedNormalLoginForm />
        )
    }
}