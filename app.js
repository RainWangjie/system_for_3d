var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

//路由
var routes = require('./routes/index');
var users = require('./routes/users');
var models = require('./routes/models');
var admin = require('./routes/admin');
var qiniu = require('./routes/qiniu');
var h5 = require('./routes/h5');


var app = express();

// view engine setup视图模版
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    layoutsDir: 'views',
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: '12345',
    name: 'system',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 600000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));
//静态文件资源存放
app.use(express.static(path.join(__dirname, 'public')));


//首页重定向到/index
app.get('/',function(req,res){
    console.log('首页重定向!');
    res.redirect('/index');
});

app.use('/index', routes);
app.use('/users', users);
app.use('/models', models);
app.use('/h5',h5);
//routes后台中间件
app.use('/admin', admin);
//获取qiniu的token
app.use('/qiniu',qiniu);


//routes移动端中间件


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
