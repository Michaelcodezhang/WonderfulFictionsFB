'use strict'

const Koa = require('koa')
const router = require('koa-router')()
const path = require('path')
const app = new Koa()
const spa = require('koa-spa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const pathname = __dirname

app.use(bodyParser())

app.use(cors({
  origin: (ctx) => {
    if (ctx.url === '/api/login') {
      return '*'
    }
  }, exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

router.prefix('/api')
  .get('/test', (ctx, next) => {
    ctx.response.body = `<h1>This is a test~</h2>`
  })
  .post('/login', (ctx, next) => {
    if (ctx.request.body.name === 'root' && ctx.request.body.password === '123456') {
      ctx.response.type = 'application/json'
      ctx.response.body = {
        code: 0
      }
    } else if (ctx.request.body.name !== 'root') {
        ctx.response.type = 'application/json'
        ctx.response.body = {
          code: 1001
        }
      }else if (ctx.request.body.name === 'root' && ctx.request.body.password !== '123456') {
        ctx.response.type = 'application/json'
        ctx.response.body = {
          code: 1002
        }
      }else {
        ctx.response.type = 'application/json'
        ctx.response.body = {
          code: 1003
        }
    }
  })
app.use(router.routes())

app.use(spa(path.join(__dirname, 'dist'), {
  index: 'index.html',
  routeBase: '/'
}))

app.listen(80)
