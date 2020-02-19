import React,{Component} from 'react'
import { Layout ,Icon ,Menu,Button} from 'antd';
import isLogin from '../../util/isLogin'
import http from '../../util/http'
import {Switch,Route,Redirect,NavLink} from 'react-router-dom'

import StudentIndex from './studentIndex'
import TeacherIndex from './teacherIndex'
import Student from './student'
import Score from './score'
import Person from './person'

const { Header,Sider, Content } = Layout;

const { SubMenu } = Menu;



class Main extends Component{
    state = {
        collapsed: false,
        menulist:[]
    };

    componentDidMount(){
        //获取菜单
        http.get('/api/getMenu').then(res => {
            if(res.data.code === 1){
                this.setState({
                    menulist:res.data.data
                })
            }
        })
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    //退出
    exit = () => {
        localStorage.clear();
        this.props.history.push('/login');
    }
    render(){
        let {menulist} = this.state;
        return <Layout className="index">
            <Header>
                <h1 className="write">1707f成绩管理系统</h1>
                <div className="write">
                    欢迎：{localStorage.getItem('username')}
                    <Button type="link" onClick={this.exit}>退出</Button>
                </div>
            </Header>
            <Layout>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {menulist.length && menulist.map((item,index) => <Menu.Item key={index+1}>
                        <Icon type="pie-chart" />
                        <span><NavLink to={'/main'+item.menuapi}>{item.menuname}</NavLink></span>
                    </Menu.Item>)}
                </Menu>
                </Sider>
                <Content>
                    <Switch>
                        <Route path="/main/studentIndex" component={StudentIndex}></Route>
                        <Route path="/main/teacherIndex" component={TeacherIndex}></Route>
                        <Route path="/main/student" component={Student}></Route>
                        <Route path="/main/score" component={Score}></Route>
                        <Route path="/main/person" component={Person}></Route>
                        <Redirect from="/" to={localStorage.getItem('role_id') === 1 ? '/main/teacherIndex':'/main/studentIndex'}></Redirect>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    }
}

export default isLogin(Main)