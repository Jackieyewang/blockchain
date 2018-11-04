import React, { Component } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const sex = [{
    value: '男',
    label: '男',
}, {
    value: '女',
    label: '女',
}];

class NormalRegisterForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不相同！');
        } else {
            callback();
        }
    }
    
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        }) (
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        return (
            <Row type="flex" justify="center" align="middle">
                <Col>
                    <Form onSubmit={this.handleSubmit} id="registerForm">
                        <FormItem
                            {...formItemLayout}
                            label="电子邮箱"
                        >
                            {getFieldDecorator('email', {
                                rules: [{
                                type: 'email', message: '请输入正确的电子邮箱帐号！',
                                }, {
                                required: true, message: '电子邮箱帐号不能为空！',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                required: true, message: '密码不能为空！',
                                }, {
                                validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="重复密码"
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                required: true, message: '请再次输入密码！',
                                }, {
                                validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                用户名&nbsp;
                                </span>
                            )}
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '用户名不能为空！', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={(
                                <span>
                                真实姓名&nbsp;
                                </span>
                            )}
                        >
                            {getFieldDecorator('realname', {
                                rules: [{ required: true, message: '真实姓名不能为空！', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="性别"
                        >
                            {getFieldDecorator('sex')(
                                <Cascader options={sex} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="手机号码"
                        >
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: '手机号码不能为空！' }],
                            })(
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="身份证号"
                        >
                            {getFieldDecorator('idnumber', {
                                rules: [{ required: true, message: '身份证号不能为空！' }],
                            })(
                                <Input style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="工作单位"
                        >
                            {getFieldDecorator('office')(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="个人简介"
                        >
                            {getFieldDecorator('profile')(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                            })(
                                <Checkbox>我已阅读<a href="/#/register">协议</a></Checkbox>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">注册</Button>
                            <a href='/#/login'>登录</a>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        )
    }
}
  
const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);

export default class Register extends Component{
    render(){
        return (
            <WrappedNormalRegisterForm />
        )
    }
}