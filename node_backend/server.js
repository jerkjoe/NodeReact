const express = require('express');
var bodyParser = require('body-parser');

const articleRouter = require('./article')

const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

var connection = require('./connection')

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err

//     console.log('The solution is: ', rows[0].solution)
// })

// connection.end()
// var sql = "CREATE TABLE articles (username VARCHAR(255), uuid VARCHAR(255), article TEXT, title VARCHAR(255))";
// var sql = "INSERT INTO users (username, password) VALUES ('jerkjoe', '123123')";
// var sql = 'SELECT * FROM users WHERE username = "jerkjoe" '
// connection.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log("Table created");
//     console.log(result)
// });
var jsonParser = bodyParser.json();

app.post('/login', jsonParser, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    console.log('username is: ', username);
    console.log('password is: ', password);

    if (!username || !password) {
        res.send({
            error: true,
            message: 'Username or password cannot be empty'
        });
    }
    var sql = 'SELECT password FROM users WHERE username = "' + username + '"';

    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log('Looking...');
        console.dir(result);

        if (result.length > 0) {
            var pw = result[0].password;
            console.log(pw);

            if (pw === password) {
                res.send({
                    error: false,
                    message: 'Login success'
                });
            } else {
                res.send({
                    error: true,
                    message: 'Username and password does not match our record'
                });
            }
        } else {
            res.send({
                error: true,
                message: 'Username and password does not match our record'
            });
        }
    });
});

app.post('/register', jsonParser, function(req, res) {


    // validate whether any param is empty
    var username = req.body.username;
    var password = req.body.password;

    console.log('username is: ', username);
    console.log('password is: ', password);

    if (!username || !password) {
        res.send({
            error: true,
            message: 'Username or password cannot be empty'
        });
    }

    var sql = 'SELECT username FROM users WHERE username = "' + username + '"';

    connection.query(sql, function(err, result) {
        if (err) {
            res.send({
                error: true,
                message: 'Unknown Error'
            });
            throw err;
        }
        console.log('Looking...');
        console.dir(result);
        if (result.length > 0) {
            res.send({
                error: true,
                message: 'Username already exist'
            });
        } else {
            var insertSQL =
                "INSERT INTO users (username, password) VALUES ('" +
                username +
                "', '" +
                password +
                "')";
            connection.query(insertSQL, function(err, result) {
                if (err) {
                    res.send({
                        error: true,
                        message: 'Unknown Error'
                    });
                    throw err;
                }
                console.log(result);
                res.send({
                    error: false,
                    message: 'Register successful'
                });
            });
        }
    });

    
});

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/article', articleRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
