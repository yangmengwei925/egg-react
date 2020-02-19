import axios from 'axios'

var instance = axios.create();

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    let writeArr = ['/api/registry','/api/login'];
    
    if(!writeArr.includes(config.path)){
        config.headers.token = localStorage.getItem('token');
    }
    
    //添加token
    console.log("config",config);
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
      if(error.response.status === 401){
          window.location.href="/login";
      }else if(error.response.status === 500){
          alert("服务器异常")
      }
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default {
    get(url,params){
        return instance.get(url,{params})
    },
    post(url,params){
        return instance.post(url,params);
    }
}
