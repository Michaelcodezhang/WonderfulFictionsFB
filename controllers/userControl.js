const fs = require('fs')

let fn_userShow = async(ctx, next) => {
    const dcDatasTxt = fs.readFileSync('./dataBase/userDatas/domesticConsumer.txt','utf-8')
    const dcDatas = JSON.parse(dcDatasTxt)
    const adminDatasTxt = fs.readFileSync('./dataBase/userDatas/Administrator.txt','utf-8')
    const adminDatas = JSON.parse(adminDatasTxt)
    ctx.response.type = 'application/type'
    ctx.response.body = {
        code: 0,
        adminLists: adminDatas,
        dcLists: dcDatas
    }
}

let fn_userDelete = async (ctx, next) => {
    const dcDatasTxt = fs.readFileSync('./dataBase/userDatas/domesticConsumer.txt','utf-8')
    const dcDatas = JSON.parse(dcDatasTxt)
    const adminDatasTxt = fs.readFileSync('./dataBase/userDatas/Administrator.txt','utf-8')
    const adminDatas = JSON.parse(adminDatasTxt)
    const userName = ctx.request.body.userName
    const superPassword = ctx.request.body.superPassword
    let isAdmin = false
    let adminDeleteNumber = -1
    let dcDeleteNumber = -1
    adminDatas.map((adminData) => {
        adminDeleteNumber++
        if (userName === adminData.userName) {
            isAdmin = true
            if (superPassword === 'psyer2018sa1') {
                adminDatas.splice(adminDeleteNumber,1)
                const adminDatasString = JSON.stringify(adminDatas)
                fs.writeFileSync('./dataBase/userDatas/Administrator.txt',adminDatasString)
                ctx.response.type = 'application/json'
                ctx.response.body = {
                    code: 0
                }
            } else {
                ctx.response.type = 'application/json'
                ctx.response.body = {
                    code: 1002  //超级密码错误
                }
            }
        }
    })
    if(isAdmin === false){
        let isDc = false
        dcDatas.map((dcData) => {
            if (userName === dcData.userName) {
                isDc = true
                if (superPassword === 'psyer2018sa1') {
                    dcDatas.splice(dcDeleteNumber,1)
                    const dcDatasString = JSON.stringify(dcDatas)
                    fs.writeFileSync('./dataBase/userDatas/domesticConsumer.txt',dcDatasString)
                    ctx.response.type = 'application/json'
                    ctx.response.body = {
                        code: 0
                    }
                } else {
                    ctx.response.type = 'application/json'
                    ctx.response.body = {
                        code: 1002  //超级密码错误
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
    'GET /api/userShow':fn_userShow,
    'POST /api/userDelete':fn_userDelete
}