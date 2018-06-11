文件作用：
.bowerrc：用于bower安装的时候，bower会找改文件，讲文件安装到对应的目录下
项目描述(2017年)
用于练手打通后端
node+express
注册加密使用的是bcrypt-nodejs
其中需要注意的是bcrypt接受四个参数，没有就是null 
例如bcrypt.hash(user.password, salt, null, function (err, hash) { ... })

