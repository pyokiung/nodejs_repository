/**
 * Created by rldnd on 2017-03-18.
 */

var express = require('express');
var router = express.Router();
var sendmail = require('../util/send_cert_mail');

// 인증메일을 발송하는 라우팅
// 데이터를 받아서 발송만 한다.

router.post('/', function (req, res) {
    var recv_data = req.body;

    sendmail(recv_data.id, recv_data.user_id);

    res.end();

});

module.exports = router;