/**
 * Created by Myown on 2017-02-01.
 */

var express = require('express');
var router = express.Router();
var users = require('../models/user');

router.post('/', function(req, res){
    var recv_data = req.body;


    console.log(recv_data);

    users.find({id:recv_data.id}, function (err, doc) {

        if (err) {
            console.log('error occur');
            console.error(err.message);
        }

        if (doc.length == 0) {
            // 데이터가 없음
            res.end("not duplicated");
        }
        else {
            // 데이터는 검출이 됨
            res.end("duplicated");
        }
    });

});

module.exports = router;