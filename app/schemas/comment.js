var mongoose = require('mongoose') //建模工具模块
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId//便于关联文档查询
var CommentSchema = new Schema({//声明字段以及相关的类型
    movie:{type:ObjectId,ref:'Movie'},
    from:{type:ObjectId,ref:'User'},
    reply:[
        {
            from:{type:ObjectId,ref:'User'},
            to:{type:ObjectId,ref:'User'},
            content:String
        }
    ],
    content:String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})
//为MovieSchema添加方法
CommentSchema.pre('save',function(next){
    if(this.isNew){//新加的一条数据
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
})
//添加静态方法
CommentSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({'_id':id})
            .exec(cb)
    }
}
module.exports = CommentSchema