var express = require('express');
var app = express();
var fs=require('fs');
var path= require('path');
var logger=require('cookie-parser');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');


var send_cert=require('./routes/send_cert');
var index=require('./routes/index');
var recv_data = require('./routes/recv_data');
var req_register = require('./routes/req_register');
var req_send_certmail = require('./routes/req_send_certmail');
var update_cert =require('./routes/update_cert');
var token=require('./models/token');
var auth=require('./models/auth');
// DB 연결 모듈
var mongoose    = require('mongoose');
mongoose.Promise = global.Promise;      /* node generator 생성기*/


// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/test_db');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));    /* express 템플리트를 렌더링하기위한 설정 2가지*/
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// POST 전송 라우팅
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname+'/certification screen'));
app.use('/', index);
//app.use('/users', users);
app.use('/token',token);
app.use('/send_data', recv_data);
app.use('/send_cert', send_cert);
app.use('/req_register', req_register);
app.use('/req_send_certmail', req_send_certmail);
app.use('/update_cert', update_cert);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.error(err.message);
    // render the error page
    res.status(err.status || 500);
    //res.render('error');
});

app.listen(3000,function () {
    console.log('server on! ');
});

module.exports = app;
