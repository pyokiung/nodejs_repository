/**
 * Created by rldnd on 2017-03-18.
 */

var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

// 난수 발생 함수 정의
var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random()*(max - min + 1)) + min;
    return ranNum;
};

var ran_num = generateRandom(10000, 99999);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '4844develop@gmail.com',
        pass: 'aq1sw2de3!'
    }
});

var mailOption = {
    from: '"Team 4844" < 4844develop@gmail.com >', // sender address
    to: '4844develop@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: '대딩여지e    도 회원 인증 test', // plain text body
    html: '<b>대딩여지도 회원 인증입니다.<br> 인증번호 <br>' + ran_num + '<br>을 입력해주세요. </b>' // html body
};

router.post('/', function (req, res) {
    transporter.sendMail(mailOption, function (err, info){
        if(err){
            console.log(err.message);
        }
        console.log("send_cert");
        console.log(info.message);
        res.end();
    });
});

module.exports = router;