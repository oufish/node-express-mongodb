var mongoose = require('mongoose')
var CommentSchema = require('../schemas/comment')
var Comment = mongoose.model('Comment',CommentSchema)//发布模型.自动在数据库创建对应的文档，全部是小写名称
module.exports = Comment