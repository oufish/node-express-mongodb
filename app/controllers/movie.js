 //电影控制器
 var Movie = require('../models/movie')
 var Comment = require('../models/comment')
 var Category = require('../models/category')
 var _ = require('underscore') //用于替换某个字段的值
 // detail page
 exports.detail = function (req, res) {
     var id = req.params.id
     Movie.findById(id, function (err, movie) {
        Comment
        .find({movie:id})
        .populate('from','name')//通过from字段关联的user表,生成一个name字段
        .populate('reply.from reply.to','name')//通过reply字段关联用户表,生成一个name字段
        .exec(function(err,comments){
            res.render('detail', {
                title: movie.title,
                movie: movie,
                comments:comments
            })
        })
     })
 }
 // 新增
 exports.new = function (req, res) {
     Category.find({},function(err,categories){
        res.render('admin', {
            title: "后台页面录入",
            categories:categories,
            movie: {}
        })
     })
 }
 //更新
 exports.update = function (req, res) {
     var id = req.params.id
     if (id) {
            Movie.findById(id, function (err, movie) {
                Category.find({},function(err,categories){
                    res.render('admin', {
                        title: "后端更新页面",
                        movie: movie,
                        categories:categories
                    })
            })
        })
     }
 }
 //修改和保存
 exports.save = function (req, res) {
     var id = req.body.movies._id
     var movieObj = req.body.movies
     var _movie
     if (id) {
         Movie.findById(id, function (err, movie) {
             if (err) console.log(err)
             _movie = _.extend(movie, movieObj) //g更新字段
             _movie.save(function (err, movie) {
                 if (err) console.log(err)
                 res.redirect('/movie/' + movie._id) //重定向到刚刚修改的列表
             })
         })
     } else {
         _movie = new Movie(movieObj)
         var categoryId = _movie.category
         _movie.save(function (err, movie) {
             if (err) console.log(err)
             Category.findById(categoryId,function(err,category){
                category.movies.push(movie._id)//把电影id存放到分类里面
                console.log(category)
                category.save(function(err,category){
                    res.redirect('/movie/' + movie._id)
                })
             })
         })
     }
 }
 //列表
 exports.list = function (req, res) {
     Movie.fetch(function (err, movies) {
         if (err) console.log(err)
         res.render('list', {
             title: "列表页面",
             movies: movies
         })
     })
 }
 //删除
 exports.del = function (req, res) {
     var id = req.query.id
     if (id) {
         Movie.remove({
             _id: id
         }, function (err, movie) {
             if (err) console.log(err)
             res.json({
                 success: 1
             })
         })
     }
 }