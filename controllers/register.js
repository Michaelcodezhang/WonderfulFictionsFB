const fs = require('fs')

const fn_register = async (ctx, next) => {
    let isUser = false
    if(ctx.request.body.inviteCode==="111222333444"){
        const userDatasTxt = fs.readFileSync('./datas/userDatas.txt','utf-8')
        const userDatas = JSON.parse(userDatasTxt)
        userDatas.map((userData) => {
            console.log('ctx.request.userName:',ctx.request.userName)
            console.log('userData.userName:',userData.userName)
            if (ctx.request.body.userName === userData.userName) {
                console.log(1)
                isUser = true
                ctx.response.type = 'application/json'
                ctx.response.body = {
                    code: 1001   //用户已存在
                }
            }
        })
        if(isUser === false){
            const userData = {
                userName: ctx.request.body.userName,
                password: ctx.request.body.password,
                authority: 2
            }
            userDatas.push(userData)
            const userDatasString = JSON.stringify(userDatas)
            fs.writeFileSync('./datas/userDatas.txt',userDatasString)
            ctx.response.type='application/json'
            ctx.response.body={
                code:0
            }
        }
    }else{
        ctx.response.type='application/json'
        ctx.response.body={
            code:1002   //邀请码不正确
        }
    }
}

module.exports = {
    'POST /api/register':fn_register
}