const jwt = require('jsonwebtoken');

module.exports = () =>{
    return async (ctx,next) => {
        // /api/login /api/registry

        let writeArr = ['/api/login','/api/registry'];

        if(writeArr.includes(ctx.path)){
            await next()
        }else{
            //需要检验
            try{
                let token = ctx.get('token');
                let info = jwt.verify(token,'1707f');
                console.log(info);
                ctx.info = info;
                await next()
            }catch(e){
                console.log(e)
                if(e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError'){
                    //token
                    ctx.status = 401;
                    ctx.body = {
                        code:4,
                        msg:e
                    }
                }else{
                    ctx.body = {
                        code:0,
                        msg:e
                    }
                }
                
            }
        }
    }
}