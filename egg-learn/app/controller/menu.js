const {Controller} = require('egg');

class MenuController extends Controller{
    async list(){
        let {ctx,service} = this;
        console.log(ctx.info)
        let menuList = await service.menu.list(ctx.info.role_id);
        ctx.body = {
            code:1,
            data:menuList
        }
    }
}

module.exports = MenuController