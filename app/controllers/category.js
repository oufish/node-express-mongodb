 //电影分类控制器
 var Category = require('../models/category')
 // 新增
 exports.new = function (req, res) {
     res.render('category_admin', {
         title: "电影分类录入页面",
         category:{}
     })
 }
 //修改和保存
 exports.save = function (req, res) {
     var _category = req.body.category 
      var category  = new Category(_category)
      category.save(function (err, categories) {
             if (err) console.log(err)
             res.redirect('/admin/category/list')
         })
 }
 //列表
 exports.list = function (req, res) {
     Category.fetch(function (err, categories) {
         if (err) console.log(err)
         res.render('categorylist', {
             title: "电影分类列表页面",
             categories: categories
         })
     })
 }