/**
 * Created by Myown on 2017-01-26.
 */

var express = require('express');
var router = express.Router();
var notices = require('../models/notice');

router.post('/', function(req, res){
    var obj = req.body;

    console.log('request is arrived.');

    /*
     var notice = new Schema({
        auth_id: String,
        date:String,
        subject: String,
        content: String
     });
    */

    var new_notice = new notices();
    new_notice.auth_id = obj.auth_id;
    new_notice.date = obj.date;
    new_notice.subject = obj.subject;
    new_notice.content = obj.content;
    new_notice.save();

    console.log('notice is save');

    res.end();

});

module.exports = router;