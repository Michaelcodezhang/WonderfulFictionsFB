'use strict'

const Koa = require('koa')
const router = require('koa-router')()
const path = require('path')
const app = new Koa()
const spa = require('koa-spa')
const bodyParser = require('koa-bodyparser')

const pathname = __dirname

app.use(bodyParser())

router.prefix('/api')
  .get('/test',(ctx,next)=>{
    ctx.response.body='<h1>This is a http test~</h1>'
  })
  .post('/login', (ctx, next) => {
    console.log(ctx.request)
    if (ctx.request.body.name === 'root' && ctx.request.body.password === '123456') {
      ctx.response.type='application/json'
      ctx.response.body = {
        code: 0
      }
      }else {
      ctx.response.type='application/json'
      ctx.response.body = {
        code: 1002
      }
    }
  })
app.use(router.routes())

app.use(spa(path.join(__dirname, 'dist'), {
  index: 'index.html',
  routeBase: '/'
}))

app.listen(80)
