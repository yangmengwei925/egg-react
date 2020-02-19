'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getList(){
      let {ctx} = this;
      ctx.body = [{name:'zs'},{name:'lisi'}]
  } 
}

module.exports = HomeController;
