/**
 * Created by Myown on 2017-02-01.
 */

var express = require('express');
var router = express.Router();
var users = require('../models/user');
var send_cert_mail = require('../util/send_cert_mail');

// 회원가입을 실시하는 모듈
// url : /req_register

router.post('/', function(req, res){
    var recv_data = req.body;

    console.log(recv_data);

    var member_data = new users();
    
    // 전달받은 req객체에서 데이터 추출
    member_data.id = recv_data.id;
    member_data.pw = recv_data.pw;
    member_data.cert_email = recv_data.cert_email;
    member_data.gender = recv_data.gender;
    member_data.certification = recv_data.certification;
    
    // 콜렉션에 다큐먼트 저장
    member_data.save();
    send_cert_mail(recv_data.cert_email, recv_data.id);

    res.end("register success");
});

module.exports = router;