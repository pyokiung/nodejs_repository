var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var token_user = new Schema({
    id: String,
    pw: String,
    token:String
});

// certification 의 default 값은 F이다.
// default 상태일 시 대학생 인증이 안된 상태
console.log("model/token");


var token_users = mongoose.model('token_users', token_user);
module.exports = token_users;