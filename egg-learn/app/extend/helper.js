module.exports = {
    //加密的函数
    hmc(pwd){
        const crypto = require('crypto');

        const secret = '1707f';
        const hash = crypto.createHmac('sha256', secret)
                        .update(pwd)
                        .digest('hex');
        return hash
    }
}