var mysql = require('mysql');
var config = require('./DbInfo').local;
 
module.exports = function () {
    return {
        init: function () {
            return mysql.createConnection({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database
            })
        }
    }
};


//https://gocoder.tistory.com/1056