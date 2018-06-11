var mongoose = require('mongoose') //建模工具模块
var Schema  = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var CategorySchema = new Schema({//声明字段以及相关的类型
    name:String,
    movies:[{type:ObjectId,ref:'Movie'}],
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
CategorySchema.pre('save',function(next){
    console.log('===================')
    console.log(this)
    console.log('===================')
    if(this.isNew){//新加的一条数据
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
})
CategorySchema.statics = {
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
module.exports = CategorySchema