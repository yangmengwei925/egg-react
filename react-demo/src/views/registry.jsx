import React,{Component} from 'react'
import { Button,Form, Icon, Input } from 'antd';
import http from '../util/http';
class NormalLoginForm extends React.Component {
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
            http.post('/api/registry',values).then(res => {
                if(res.data.code === 1){
                    //注册成功
                    alert("注册成功");
                    this.props.history.push('/login')
                }else{
                    alert("注册失败");
                }
            })
        }
      });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }],
                })(
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                />,
                )}
            </Form.Item>
          <Form.Item>
            {getFieldDecorator('num', {
              rules: [{ required: true, message: '请输入学号' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="学号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, max:6,min:4,message: '密码有误' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              注册
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

  export default WrappedNormalLoginForm