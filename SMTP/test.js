/* Created by rldnd on 2017-03-19. */
var http = require('http');
var express=require('express'); //
var app = express();   //
var fs = require('fs'); //
var url = require('url');
var path=require('path'); //
var logger=require('cookie-parser');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');


// view engine setup
app.set('views', path.join(__dirname, 'views'));    /* express 템플리트를 렌더링하기위한 설정 2가지*/
app.set('view engine', 'jade');


// POST 전송 라우팅
app.use(express.static(path.join(__dirname+'/views'))); //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// app.use(express.static(path.join(__dirname, 'public')));  //

// 서버 생성
http.createServer(function(request,response){

    // URL 뒤에 있는 디렉토리/파일이름 파싱
    var pathname = url.parse(request.url).pathname;


    console.log("Request for " + pathname + " received.");

    // 파일 이름이 비어있다면 index.html 로 설정
   // if (pathname == "/") {
     //     pathname = "/views/index.html";
        // 파일을 읽기
        fs.readFile(pathname.substr(1), function (error, data) {
            if (error) {
                console.log(error);
                // 페이지를 찾을 수 없음
                // HTTP Status: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, {'Content-Type': 'text/html'});
            } else {

                // 페이지를 찾음
                // HTTP Status: 200 : OK
                // Content Type: text/plain
                response.writeHead(200, {'Content-Type': 'text/html'});
               // 파일을 읽어와서 responseBody 에 작성
                response.write(data.toString());
            }
            // responseBody 전송
            response.end();
        });
 //   }

   // 파일을 읽기

}).listen(55555);
console.log('Server running at http://127.0.0.1:55555');
