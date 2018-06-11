//用户控制器
var User = require('../models/user')
//注册
exports.showSingup = function (req, res) {
    res.render('singup',{
        title: "注册页面"
    })
}
exports.signup = function (req, res) {
    var _user = req.body.user
    User.findOne({'name': _user.name}, function (err, user) {
        if (err) console.log(err)
        if (user) {
            res.redirect('/signin')
        } else {
            var user = new User(_user)
            user.save(function (err, userobj) {
                if (err) console.log(err)
                res.redirect('/')
            })
        }
    })
}
//登录
exports.showSingin = function (req, res) {
    res.render('signin',{
        title: "登录页面"
    })
}
exports.signin = function (req, res) {
    var _user = req.body.user
    var name = _user.name
    var password = _user.password
    User.findOne({'name': name}, function (err, user) {
        if (err) console.log(err)
        if (!user) return res.redirect('/signup')
        user.comparePassword(password, function (err, isMatch) {
            if (err) console.log(err)
            if (isMatch) {
                req.session.user = user //登录成功后将user放在会话session里面
                console.log("========session==================")
                console.log(req.session)
                console.log("========session==================")
                return res.redirect('/')
            } else {
                return res.redirect('/signin')
            }
        })
    })
}
//注销
exports.logout = function (req, res) {
    delete req.session.user
    // delete app.locals.user
    res.redirect('/')
}
//用户列表
exports.list = function (req, res) {
    User.fetch(function (err, users) {
        if (err) console.log(err)
        res.render('userList', {
            title: "用户列表页面",
            users: users
        })
    })
}
//中间件 midware for user
exports.signinRequired = function (req, res,next) {
    var user = req.session.user
    console.log("查看登录")
    console.log(user)
    console.log("查看登录")
    if(!user){
        return res.redirect('/signin')
    }
    console.log(1)
    next()
}
//中间件 midware for adminuser
exports.adminRequired = function (req, res,next) {
    var user = req.session.user
    // if(user.role<=10){
    //     return res.redirect('/signin')
    // }
    next()
}