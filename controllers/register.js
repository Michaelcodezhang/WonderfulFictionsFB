const fs = require('fs')

const fn_register = async (ctx, next) => {
    let isUser = false
    if(ctx.request.body.inviteCode==="1347zpa36xxz"){
        const dcDatasTxt = fs.readFileSync('./dataBase/userDatas/domesticConsumer.txt','utf-8')
        const dcDatas = JSON.parse(dcDatasTxt)
        const adminDatasTxt = fs.readFileSync('./dataBase/userDatas/Administrator.txt','utf-8')
        const adminDatas = JSON.parse(adminDatasTxt)
        dcDatas.map((dcData) => {
            if (ctx.request.body.userName === dcData.userName) {
                isUser = true
            }
        })
        adminDatas.map((adminData) => {
            if (ctx.request.body.userName === adminData.userName) {
                isUser = true
            }
        })
        if(isUser === false){
            const dcData = {
                userName: ctx.request.body.userName,
                password: ctx.request.body.password,
                authority: 2
            }
            dcDatas.push(dcData)
            const dcDatasString = JSON.stringify(dcDatas)
            fs.writeFileSync('./dataBase/userDatas/domesticConsumer.txt',dcDatasString)
            ctx.response.type='application/json'
            ctx.response.body={
                code:0
            }
        }
    }else if(ctx.request.body.inviteCode==="zlcx752r4vip"){
        const dcDatasTxt = fs.readFileSync('./dataBase/userDatas/domesticConsumer.txt','utf-8')
        const dcDatas = JSON.parse(dcDatasTxt)
        const adminDatasTxt = fs.readFileSync('./dataBase/userDatas/Administrator.txt','utf-8')
        const adminDatas = JSON.parse(adminDatasTxt)
        dcDatas.map((dcData) => {
            if (ctx.request.body.userName === dcData.userName) {
                isUser = true
            }
        })
        adminDatas.map((adminData) => {
            if (ctx.request.body.userName === adminData.userName) {
                isUser = true
            }
        })
        if(isUser === false){
            const adminData = {
                userName: ctx.request.body.userName,
                password: ctx.request.body.password,
                authority: 1
            }
            adminDatas.push(adminData)
            const adminDatasString = JSON.stringify(adminDatas)
            fs.writeFileSync('./dataBase/userDatas/Administrator.txt',adminDatasString)
            ctx.response.type='application/json'
            ctx.response.body={
                code:0
            }
        }
    } else{
        ctx.response.type='application/json'
        ctx.response.body={
            code:1002   //邀请码不正确
        }
    }
    if(isUser === true){
        ctx.response.type = 'application/json'
        ctx.response.body = {
            code: 1001   //用户已存在
        }
    }
}

module.exports = {
    'POST /api/register':fn_register
}