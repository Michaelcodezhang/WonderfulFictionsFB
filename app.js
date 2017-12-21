'use strict'

const Koa = require('koa')
const router = require('koa-router')()
const path = require('path')
const app = new Koa()
const spa = require('koa-spa');
const bodyParser = require('koa-bodyparser')

const pathname = __dirname

app.use(bodyParser())

router.prefix('/api')
  .post('/login', (ctx,next)=>{
    if(ctx.request.body.name === 'root' && ctx.request.body.password === '123456'){
      ctx.response.body={
        code:0
      }
    }
  })
app.use(router.routes())

app.use(spa(path.join(__dirname, 'dist'), {
  index: 'index.html',
  routeBase: '/'
}))

app.listen(80)
