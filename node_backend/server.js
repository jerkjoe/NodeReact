const express = require('express')
var bodyParser = require('body-parser')


const app = express()
const port = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'remotemysql.com',
    port: '3306',
    user: 'JVIlsWXgGL',
    password: '6MUPR0P8PV',
    database: 'JVIlsWXgGL'
})

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
})

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err

//     console.log('The solution is: ', rows[0].solution)
// })

// connection.end()
// var sql = "CREATE TABLE users (username VARCHAR(255), password VARCHAR(255))";
// var sql = "INSERT INTO users (username, password) VALUES ('jerkjoe', '123123')";
// var sql = 'SELECT * FROM users WHERE username = "jerkjoe" '
// connection.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log("Table created");
//     console.log(result)
// });
var urlencodedParser = bodyParser.json()

app.post('/login', urlencodedParser, function(req, res) {
    console.log('hello')
    console.log(req.body)
    res.send(req.body)
})


app.get('/', (req, res) => res.send('Hello World!'))





app.listen(port, () => console.log(`Example app listening on port ${port}!`))
