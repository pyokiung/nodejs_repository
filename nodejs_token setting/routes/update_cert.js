/**
 * Created by Myown on 2017-02-02.
 */

var express = require('express');
var router = express.Router();
var users = require('../models/user');


router.get('/', function(req, res){
   // GET 방식으로 데이터 쿼리를 전달받음
   var id = req.query.user_id;
   users.update({id:id}, {$set: {certification:"T"}}, function (err, output) {
      // 데이터 업데이트
      if(err){
          console.error(err.message);
       }
       res.end('회원 인증이 완료되었습니다.');

   });
});

module.exports = router;