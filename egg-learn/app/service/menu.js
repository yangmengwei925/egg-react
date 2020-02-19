const {Service} = require('egg');

class MenuService extends Service{
    async list(role_id){
        return await this.app.mysql.query(`select menu_list.menuname,menu_list.menuapi from menu_list where power like '%${role_id}%'`)
    }
}

module.exports = MenuService