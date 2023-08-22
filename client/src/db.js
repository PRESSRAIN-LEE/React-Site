var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'svc.sel4.cloudtype.app',
    user: 'root',
    password: '3prof2llkytigld',
    database: 'management',
    port: '30723',
});
db.connect();

module.exports = db;