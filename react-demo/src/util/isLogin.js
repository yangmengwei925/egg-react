import React,{Component} from 'react'

function isLogin(Com){
    return class extends Component{
        state = {
            isLogin:false
        }
        componentDidMount(){
            let token = localStorage.getItem('token');
            if(token){
                this.setState({
                    isLogin:true
                })
            }else{
                this.props.history.push('/login');
            }
        }
        render(){
            let {isLogin} = this.state;
            return isLogin?<Com {...this.props}/>:<></>
        }
    }
}

export default isLogin