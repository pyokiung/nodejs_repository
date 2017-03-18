/**
 * Created by rldnd on 2017-03-18.
 */


var express = require('express');
var router = express.Router();
var users = require('../models/user');
var send_cert_mail = require('../util/send_cert_mail');


var auth=require('../models/auth'); // token 생성 함수 사용하기위한 모듈
var token_users=require('../models/token');

// 회원가입을 실시하는 모듈
// url : /req_register

router.post('/', function(req, res){
    if(!(req.body.id))
    {
        res.send(401,'Wrong user or username');
        return;
    }
    var recv_data = req.body;
    console.log("./routes/req_register");
    console.log(recv_data);  /* 이칸에서 출력을 한다. */

    /*  var member_data = new users();
     var jwt      = require('jsonwebtoken');
     var tokenKey = "TEST_KEY11"; //토큰키 서버에서 보관 중요
     var payLoad  = {'uid':14554};
     var token = jwt.sign(payLoad,tokenKey,{
     algorithm : 'HS256', //"HS256", "HS384", "HS512", "RS256", "RS384", "RS512" default SHA256
     //   expiresInMinutes : 1440 //expires in 24 hours
     });
     //token 생성
     */

    //collections 1
    var member_data = new users();
    // 전달받은 req객체에서 데이터 추출
    member_data.id = recv_data.id;
    member_data.pw = recv_data.pw;
    member_data.cert_email = recv_data.cert_email;
    member_data.gender = recv_data.gender;
    member_data.certification = recv_data.certification;
    //users informations
    console.log(member_data);
    //test


    console.log("------------")
    //collections 2
    var tokens_data=new token_users();
    tokens_data.id=recv_data.id;
    tokens_data.pw=recv_data.pw;
    var tokens=auth.signToken(recv_data.id); //token키 발급
    tokens_data.token=tokens;
    // users token informations

    console.log(tokens_data);
    //test

    // 콜렉션에 다큐먼트 저장
    member_data.save();
    tokens_data.save();
    send_cert_mail(recv_data.cert_email, recv_data.id);
    res.end("register success");
});

module.exports = router;