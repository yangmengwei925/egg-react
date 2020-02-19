const {Controller} = require('egg');
const moment = require('moment');

class ScoreController extends Controller{
    //录入成绩
    async addScore(){
        let {ctx,service} = this;
        let {username,num,theory,skill} = ctx.request.body;

        let time = new Date();

        if(username && num && (0<=theory && theory<=100) && (0<=skill && skill<=100)){
            try{
                await service.score.addScore(username,num,theory,skill,time);
                ctx.body = {
                    code:1,
                    msg:'录入成功'
                }
            }catch(e){
                ctx.body = {
                    code:0,
                    msg:e
                }
            }
            
        }else{
            ctx.body = {
                code:2,
                msg:'参数有误'
            }
        }
    }
    //查询没有录入成绩的人员
    async notScore(){
        let {ctx,service} = this;
        let time = moment(new Date()).format('YYYY-MM-DD');
        let list = await service.score.notScore(time);
        ctx.body = {
            code:1,
            data:list
        }
    }
    //编辑成绩
    async editScore(){
        let {ctx,service} = this;
        let {theory,skill,num} = ctx.request.body;
        if(num && (0<=theory && theory<=100) && (0<=skill && skill<=100)){
            try{
                await service.score.editScore(theory,skill,num);
                ctx.body = {
                    code:1,
                    msg:'修改成功'
                }
            }catch(e){
                ctx.body = {
                    code:0,
                    msg:e
                }
            }
        }else{
            ctx.body = {
                code:2,
                msg:'参数有误'
            }
        }
    }

    //删除
    async del(){
        let {ctx,service} = this;
        let {id} = ctx.query;
        if(id){
            try{
                await service.score.del(id);
                ctx.body = {
                    code:1,
                    msg:'删除成功'
                }
            }catch(e){
                ctx.body = {
                    code:0,
                    msg:e
                }
            }
        }else{
            ctx.body = {
                code:2,
                msg:'参数有误'
            }
        }
    }
    //搜索
    async search(){
        let {ctx,service} = this;
        let {key} = ctx.query;
        if(key){
            let list = await service.score.search(key);
            ctx.body = {
                code:1,
                data:list
            }
        }else{
            ctx.body = {
                code:2,
                msg:'参数有误'
            }
        }
    }
}

module.exports = ScoreController