/**
 * Created by Myown on 2017-01-26.
 */

var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var notice = new Schema({
    auth_id: String,
    date:String,
    subject: String,
    content: String
});
console.log("./models/notice");
var notices = mongoose.model('notices', notice);

module.exports = notices;