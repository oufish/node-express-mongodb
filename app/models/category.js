var mongoose = require('mongoose')
var CategorySchema = require('../schemas/category')
//编译生成模型
var Category = mongoose.model('Category',CategorySchema)
module.exports = Category