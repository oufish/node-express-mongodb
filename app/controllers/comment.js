 //电影控制器
 var Comment = require('../models/comment')
 //保存
 exports.save = function (req, res) {
     var _comment = req.body.comment
     var movieId = _comment.movie
     if(_comment.cid){//评论别人的评论
         Comment.findById(_comment.cid,function(err,comment){
             var reply = {
                 form:_comment.from,
                 to:_comment.tid,
                 content:_comment.content
             }
             comment.reply.push(reply)
             comment.save(function (err, comment) {
                 console.log('====这里有bug====因为数据库的版本。mongodb 3.6取消了$pushAll，要么降到3.4要么升级到5.x')
                 console.log(comment)
                 console.log('====这里有bug====因为数据库的版本')
                if (err) console.log(err)
                res.redirect('/movie/' + movieId)
            })
         })
     }else{
        var comment = new Comment(_comment)
        comment.save(function (err, comment) {
            if (err) console.log(err)
            res.redirect('/movie/' + movieId)
        })
     }
 }