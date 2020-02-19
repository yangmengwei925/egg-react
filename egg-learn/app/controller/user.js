const {Controller} = require('egg');

const jwt = require('jsonwebtoken');

class UserController extends Controller{
    //注册
    async registry(){
        let {ctx,service} = this;
        let {username,password,num} = ctx.request.body;
        if(username && /^\d{4,6}$/.test(password) && num){
             let data = await service.user.selectUser(num);
            if(data.length){
                ctx.body = {
                    code:3,
                    msg:'此用户名已被使用'
                }
            }else{
                try{
                    let newPwd = ctx.helper.hmc(password);
                    await service.user.registry(username,newPwd,num);
                    ctx.body = {
                        code:1,
                        msg:'注册成功'
                    }
                 }catch(e){
                     ctx.body = {
                         code:0,
                         msg:e
                     }
                 }
            }
        }else{
            ctx.body = {
                code:2,
                msg:'参数不完整'
            }
        }
       
    }
    //登录
    async login(){
        let {ctx,service} = this;
        let {num,password} = ctx.request.body;

        if(/^\d{4,6}$/.test(password) && num){
            let newPwd = ctx.helper.hmc(password);
            let data = await service.user.login(num,newPwd); //[{}]
            if(data.length){
                console.log("================================")
                let token = jwt.sign({num,role_id:data[0].role_id},'1707f',{expiresIn:60*60})
                ctx.body = {
                    code:1,
                    msg:'登录成功',
                    token,
                    username:data[0].username,
                    role_id:data[0].role_id
                }
            }else{
                ctx.body = {
                    code:0,
                    msg:'登录失败'
                }
            }
        }else{
            ctx.body = {
                code:2,
                msg:'参数有误'
            }
        }
    }
}

module.exports = UserController