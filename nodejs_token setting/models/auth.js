/**
 * Created by rldnd on 2017-02-17.
 */

'use strict';
var user=require('./user');
var jwt = require('jsonwebtoken');
var compose = require('composable-middleware');
var SECRET = 'token_secret';
var EXPIRES = 60; // 1 hour
function signToken(id) {

    var JsonWebTokenError = function (message, error) {
        Error.call(this, message);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'JsonWebTokenError';
        this.message = message;
        if (error) this.inner = error;
    };

    JsonWebTokenError.prototype = Object.create(Error.prototype);
    JsonWebTokenError.prototype.constructor = JsonWebTokenError;

    return jwt.sign({id: id}, SECRET,{algorithm:'HS256'});
//, expiresInMinutes : 1440



}
        // encode(payload,key,algorithm)
        //header:(type:"JWT", alg:"HS256)
        //payload: data value
        //signature


exports.signToken = signToken;
//module.exports = JsonWebTokenError;

/*
//decoding
module.exports = function (jwt, options) {
    options = options || {};
    var decoded = jws.decode(jwt, options);
    if (!decoded) { return null; }
    var payload = decoded.payload;

    //try parse the payload
    if(typeof payload === 'string') {
        try {
            var obj = JSON.parse(payload);
            if(typeof obj === 'object') {
                payload = obj;
            }
        } catch (e) { }
    }
    //header가 만약 complete 할수 있으면 header 리턴
    if (options.complete === true) {
        return {
            header: decoded.header,
            payload: payload,
            signature: decoded.signature
        };
    }
    return payload;
};*/