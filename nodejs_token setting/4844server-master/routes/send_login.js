/**
 * Created by Myown on 2017-02-01.
 */

var express = require('express');
var router = express.Router();
var users = require('../models/user');

router.post('/', function (req, res) {
    var recv_data = req.body;
    var user_id = recv_data.id;

    //console.log(req);
    console.log("login request id : " + recv_data.id + '\nlogin request pw : ' + recv_data.pw);

    // users 콜렉션에 대한 데이터 모델은
    // 이미 /models/user.js 파일에서
    // 정의해서 모듈로 빼냈기 때문에
    // var users = require('../models/user');
    // 구문을 이용하면 콜렉션을 사용할 수 있다.

    users.find({id:user_id}, function (err, doc) {
        if(err){
            res.end("error occur");
        }
        // 어차피 로그인 세션은
        // JSON 파일을 전송할 필요가 없을 땐
        // res.end()를 이용해 결과값을 String 형태로 전송하고
        // 연결 세션을 닫아도 상관 없다.
        if(doc.length == 0){
            res.end("no id");
        }
        else{
            var user_data = doc[0];
            if(recv_data.pw == user_data.pw){
                // 비밀번호는 맞는데
                if(user_data.certification == "F"){
                    // 인증이 안된 상황
                    res.end("certification needed");
                }
                else{
                    // 인증이 된 상황 -> 로그인 성공으로 다음 페이지 전환
                    res.end("login success");    
                }
            }
            else{
                res.end("not correct password");
            }
        }
    })
});

module.exports = router;
