var mongoose = require('mongoose') //建模工具模块
var bcrypt = require('bcrypt-nodejs')
// var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10
var UserSchema = new mongoose.Schema({//声明字段以及相关的类型
    name:{
        unique:true,
        type:String
    },
    password:String,
    //0 普通用户
    //1 一般用户
    //2 超级用户
    //>10 超级管理员
    role:{
        type:Number,
        default:0
    },
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
UserSchema.pre('save',function(next){
    var user = this
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){//构建随机数（第一个参数是计算强度，第二个是得到的东西）
        if(err) return next( err)
        bcrypt.hash(user.password,salt,null,function(err,hash){//算法加盐.必须接受四个参数，没有补null
            if(err) return next( err)
            user.password = hash
            next()
        })
    })
})
UserSchema.methods={
    comparePassword:function(_password,cb){
        bcrypt.compare(_password,this.password,function(err,isMatch){
            if(err)cb(err)
            cb(null,isMatch)
        })
    }
}
UserSchema.statics = {
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
module.exports = UserSchema