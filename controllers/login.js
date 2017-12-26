const fs = require('fs')

let fn_login = async (ctx, next) => {
    const dcDatasTxt = fs.readFileSync('./dataBase/userDatas/domesticConsumer.txt','utf-8')
    const dcDatas = JSON.parse(dcDatasTxt)
    const adminDatasTxt = fs.readFileSync('./dataBase/userDatas/Administrator.txt','utf-8')
    const adminDatas = JSON.parse(adminDatasTxt)
    const userName = ctx.request.body.name
    const password = ctx.request.body.password
    let isAdmin = false
    adminDatas.map((adminData) => {
        if (userName === adminData.userName) {
            isAdmin = true
            if (password === adminData.password) {
                ctx.response.type = 'application/json'
                ctx.response.body = {
                    code: 0,
                    data: {
                        userName: adminData.userName,
                        authority: adminData.authority
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
    if(isAdmin === false){
        let isDc = false
        dcDatas.map((dcData) => {
            if (userName === dcData.userName) {
                isDc = true
                if (password === dcData.password) {
                    ctx.response.type = 'application/json'
                    ctx.response.body = {
                        code: 0,
                        data: {
                            userName: dcData.userName,
                            authority: dcData.authority
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
        if(isDc === false){
            ctx.response.type = 'application/json'
            ctx.response.body = {
                code: 1001  //用户不存在
            }
        }
    }
}

module.exports = {
    'POST /api/login':fn_login
}