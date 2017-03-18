'use strict';


var email = require("emailjs");

function SendMail(options) {
    var server = email.server.connect({

        user: "your-id",

        password: "your-password",

        host: "smtp.email.com", // ex) smtp.naver.com

        ssl: true

    });

    var message = {

        text: options.text || "test sending email with node.js",

        from: "you <your-id@naver.com>",

        to: options.to || "whom <someone@naver.com>",

        subject: options.subject || "testing emailjs",

        attachment:
            [

                {data: options.data || "<html>i <i>hope</i> this works!</html>", alternative: true}

            ]
    };

    server.send(message, function(err, message) {

        console.log(err || message);

    });
}

module.exports = {

    send: SendMail

};