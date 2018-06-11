var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(express)//持久化会话中间件,存储到mongodb里面
var port = process.env.PORT || 3001
var app = express()
var dbUrl = 'mongodb://localhost/movie'
mongoose.connect(dbUrl) //连接数据库
app.set('views', './app/views/pages') //设置视图的根目录
app.set('view engine', 'jade') //设置模板引擎
app.use(express.bodyParser())//处理提交表单的数据，将数据格式化
app.use(express.cookieParser())//中间件，为session服务
app.use(express.session({
    secret:'admin',
    store:new mongoStore({//存储
        url:dbUrl,
        collection:'sessions'
    })
}))//会话session,会话刷新就会保持了
if('development'===app.get('env')){//开发环境设置堆栈信息
    app.set('showStackError',true)
    app.use(express.logger(':method :url :status'))
    app.locals.pretty = true //让压缩的代码可读
    mongoose.set('debug',true)
}
require('./config/router')(app)
//dirname 表示当前目录
//express.static表示使用静态文件... 静态资源的获取
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment =  require('moment')//本地调用
app.listen(port)
console.log('start:' + port)
