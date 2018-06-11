var Index = require('./../app/controllers/index')
var User = require('./../app/controllers/user')
var Movie = require('./../app/controllers/movie')
var Comment = require('./../app/controllers/comment')
var Category = require('./../app/controllers/category')
module.exports = function (app) {
    //预处理处理所有请求的session问题
    app.use(function (req, res, next) {
        var _user = req.session.user
        app.locals.user = _user
        next() //直接过后续的操作
    })
    //首页
   app.get('/',Index.index)//首页路由
   //用户
   app.post('/user/signup',User.signup)//用户注册
   app.post('/user/signin',User.signin)//用户登录
   app.get('/signin',User.showSingin)//用户登录
   app.get('/signup',User.showSingup)//用户注册
   app.get('/logout',User.logout)//用户注销
   app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)//用户列表(配置了两个中间件，控制访问权限)
   //电影
   app.get('/movie/:id',Movie.detail)//电影详情页面
   app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new)//电影录入
   app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)//电影更新
   app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.save)//电影新增
   app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)//电影列表
   app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)//电影删除
   //评论
   app.post('/user/comment',User.signinRequired,Comment.save)//评论
   //分类categorylist
   app.get('/admin/category/new',User.signinRequired,Category.new)//电影分类页面
   app.post('/admin/category',User.signinRequired,Category.save)//电影分类录入
   app.get('/admin/category/list',User.signinRequired,Category.list)//电影分类列表
}