var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'remotemysql.com',
    port: '3306',
    user: 'JVIlsWXgGL',
    password: '6MUPR0P8PV',
    database: 'JVIlsWXgGL'
});

module.exports = connection
