'use strict'

const Koa = require('koa')
const router = require('koa-router')()
const path = require('path')
const app = new Koa()
const spa = require('koa-spa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const fs =require('fs')
const conroller = require('./controller')


app.use(bodyParser())

app.use(cors({
  origin: (ctx) => {
    return '*'
  }, exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

app.use(conroller())

app.use(spa(path.join(__dirname, 'dist'), {
  index: 'index.html',
  routeBase: '/'
}))

app.listen(8090)
