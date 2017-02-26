/**
 * Created by Myown on 2017-01-26.
 * 회원가입 및 관리에 필요한
 * 회원 데이터 모델
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    id: String,
    pw: String,
    nickname: String,
    cert_email: String,
    gender: String,
    certification: String
});

// certification 의 default 값은 F이다.
// default 상태일 시 대학생 인증이 안된 상태

var users = mongoose.model('users', user);

module.exports = users;