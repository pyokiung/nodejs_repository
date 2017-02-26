/**
 * Created by Myown on 2017-01-21.
 */

var express = require('express');
var router = express.Router();
var users = require('../models/user');
var tokens=require('../models/token');
var result_flag = 0;

// DB 모델 스키마를 작성
// 콜렉션을 정의(없으면 콜렉션 인스턴스 생성, 있으면 그대로 사용)
// 두번째 파라미터는 콜렉션에 대한 모델 스키마이다.

router.post('/', function (req, res) {
    var recv_data = req;
    console.log("recv_data");
    // 클라이언트 측에서 Content-Type 을
    // application/json 으로 해야
    // body-parser 미들웨어가 정상적으로 작동함.

    // mongoose 를 이용해서 데이터를 추출하고 싶으면
    // 모델 스키마를 이용해야 한다.
    // var users = mongoose.model('users', user_info);
    // 에서 'users'는 콜렉션 이름(?) 이다.

    var string_obj = recv_data.body;
    var data_id = string_obj.id;

    var flag = 0; // 아이디 중복 확인 플래그
 //   console.log("./routes/recv_data");

    users.find({id:data_id}, function (err, doc) {
        if(err){
            console.log('error occur');
            console.error(err.message);
        }
        if(doc.length == 0){
            // 데이터가 없음
            console.log('no data');
        }
        else{
            // 데이터는 검출이 됨
            for(var i = 0; i < doc.length; i++){
                // 검출된 document 배열을 확인해서
                // 하나라도 중복된 id값이 나오면
                // flag 값이 올라감
                var tmp = doc[i];
                if(tmp.id == data_id){
                    flag += 1;
                }
            }
        }

        // 왜 find 함수 내부에서 체크해서 돌려야 하는가?
        //170122 어쨋든 회원가입 + 중복확인 서버사이드 모듈은 만들었음.
        // DB랑 서버사이드 모듈이랑 동기화가 안되서 find 함수가 끝나기 전에
        // 비동기 방식으로 함수가 종료되어버린다.
        // I/O 블로킹을 해야 동기화가 된다.

        if(flag <= 0){
            // flag 값이 0보다 크다는 것은
            // 이미 등록된 id값이 존재한다는 것이다.
            var new_user_data = new users();
            new_user_data.comment = string_obj.comment;
            new_user_data.id = string_obj.id;
            new_user_data.pw = string_obj.pw;
            new_user_data.save();
            console.log(new_user_data.id + ' sign in');
        }

        result_flag = flag;
        if(result_flag > 0){
            console.log("register session is failed for duplicated id.")
        }
        else if(result_flag == 0){
            console.log("register session is complete.")
        }

        res.send(toString(resultkt_flag));
    });
});

module.exports = router;