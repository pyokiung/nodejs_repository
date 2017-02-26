/**
 * Created by Myown on 2017-02-02.
 */
//var expressJwt=require('express-jwt');
//var jwt=require('jsonwebtoken');
/* token 생성 */

var auth=require('../models/auth'); // token 생성 함수 사용하기위한 모듈
var nodemailer = require('@nodemailer/pro');
// 인증 email 을 전송하는 모듈이다.
var randomNumberGenerater = function (min, max) {
    var ranNum = Math.floor(Math.random()*(max - min + 1)) + min;
    return ranNum;
};

var randomNumber = randomNumberGenerater(100000, 999999);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '4844develop@gmail.com',
        pass: 'aq1sw2de3!'
    }
});

var sendCertEmail = function (mailAddr, user_id) {

    // 파라미터 mailAddr 을 통해
    // 인증할 email 주소를 받으면
    // 해당 주소로 인증 메일을 보내는 함수

    // 170202
    // 인증 메일에서 html body 의 내용을
    // 버튼 클릭 -> POST/GET 요청 형태로
    // 구현해야함
    // 구현 완료

    var req_url =  'http://127.0.0.1:54211/update_cert?user_id=  '; // 요청할  url 에 쿼리를 붙임

    var mailOption = {
        from: '"Team 4844" < pyokiung@gmail.com >', // sender address
        to: mailAddr, // list of receivers
        subject: user_id + '님, 대딩여지도 회원 인증 메일입니다!', // Subject line
        text: '대딩여지도 회원 인증 test', // plain text body
        html: '<body><b>대딩여지도 회원 인증입니다.<br>' + '<br>' +
        '<a href="' + req_url +"   "+  + '"> 링크</a><br>' + '<br>을 눌러주세요. </b></body>'

         // html body
    };

    transporter.sendMail(mailOption, function (err, info){
        if(err){
            console.log(err.message);
        }
        console.log("/util/send_cert_mail");
        //auth.isAuthenticated(token);
        //디코딩 코드 서버에 삽입

        console.log(info.message);
    });
};


module.exports = sendCertEmail;