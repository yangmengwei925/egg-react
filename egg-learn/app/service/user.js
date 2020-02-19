const {Service} = require('egg');

class UserService extends Service{
    //注册
    async registry(username,password,num){
        //和数据库操作
        await this.app.mysql.query('insert into userlist (username,password,num,role_id) values (?,?,?,?)',[username,password,num,3]);
    }
    //查询此人是否存在
    async selectUser(num){
        return await this.app.mysql.query('select * from userlist where num=?',[num])
    }

    //登录
    async login(num,password){
        return this.app.mysql.query('select * from userlist where num=? and password=?',[num,password])
    }
}

module.exports = UserService