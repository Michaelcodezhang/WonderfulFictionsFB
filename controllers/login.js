const fs = require('fs')

let fn_login = async (ctx, next) => {
    const userDatasTxt = fs.readFileSync('./datas/userDatas.txt','utf-8')
    const userDatas = JSON.parse(userDatasTxt)
    const userName = ctx.request.body.name
    const password = ctx.request.body.password
    let isUser = false
    userDatas.map((userData) => {
        if (userName === userData.userName) {
            isUser = true
            if (password === userData.password) {
                ctx.response.type = 'application/json'
                ctx.response.body = {
                    code: 0,
                    data: {
                        userName: userData.userName,
                        authority: userData.authority
                    }
                }
            } else {
                ctx.response.type = 'application/json'
                ctx.response.body = {
                    code: 1002  //密码错误
                }
            }
        }
    })
    if(isUser === false){
        ctx.response.type = 'application/json'
        ctx.response.body = {
            code: 1001  //用户不存在
        }
    }
}

module.exports = {
    'POST /api/login':fn_login
}