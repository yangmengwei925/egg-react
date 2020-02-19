const {Service} = require('egg');

const moment = require('moment');

class ScoreService extends Service{
    async addScore(username,num,theory,skill,time){
        await this.app.mysql.query('insert into score_list (username,num,theory,skill,time) values (?,?,?,?,?)',[username,num,theory,skill,time])
    }
    //查询没有录入成绩的人员列表
    async notScore(time){
        return await this.app.mysql.query('select userlist.username,userlist.num from userlist where num not in (select score_list.num from score_list where DATE_FORMAT(time,"%Y-%m-%d")=?)',[time])
    }
    //编辑
    async editScore(theory,skill,num){
        let time = moment(new Date()).format('YYYY-MM-DD');
        await this.app.mysql.query('update score_list set theory=?,skill=? where num=? and date_format(time,"%Y-%m-%d")=?',[theory,skill,num,time])
    }
    //删除
    async del(id){
        await this.app.mysql.query('delete from score_list where id=?',[id])
    }

    //搜索
    async search(key){
        console.log("key",key)
        return await this.app.mysql.query(`select * from score_list where username like '%${key}%'`)
    }
}

module.exports = ScoreService