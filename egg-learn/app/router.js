'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/userlist',controller.home.getList);
  //注册
  router.post('/api/registry',controller.user.registry);
  //登录
  router.post('/api/login',controller.user.login);
  //录入成绩
  router.post('/api/addScore',controller.score.addScore);
  //查询没有录入成绩的人员列表
  router.get('/api/notScore',controller.score.notScore);
  //修改成绩
  router.put('/api/editScore',controller.score.editScore);
  //删除
  router.delete('/api/del',controller.score.del);
  //搜索
  router.get('/api/search',controller.score.search);
  //根据身份查询菜单
  router.get('/api/getMenu',controller.menu.list);
};
