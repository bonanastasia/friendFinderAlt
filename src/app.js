const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
var connection;

if(process.env.JAWSDB_URL){
	connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{ connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'friendFinder_db'
});
};

connection.connect();



app.use(bodyParser.urlencoded({
    extended: true
}));

//serve up assets folder and all content as static files from server to client.
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.get("/results", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/results.html"));
});

// app.get('/results', function(req, res){
// 	connection.query('SELECT * FROM friends', function(err, data){
// 		if(err) throw err;
// 		res.send(data);
// 	});
// });

// A GET route with the url /api/friends to display a JSON of all possible friends.
app.get("/api/friends", function(req, res) {
    connection.query("SELECT * FROM friends", function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});


app.post('/survey', function(req, res) {

    //confirm that you're receiving data
    console.log(req.body);

    //set the req.body into a few variables to use in your upcoming query.
    let name = req.body.name;
    let photo = req.body.photo;
    let location = req.body.location;
    let hobbies = req.body.hobbies;
    let userArr = [req.body.q1, req.body.q2, req.body.q3, req.body.q4, req.body.q5, req.body.q6, req.body.q7, req.body.q8, req.body.q9, req.body.q10];
    console.log(userArr);

    //here's an alternate secure method as per the documentation.
    connection.query('INSERT INTO friends(name, location, photo, hobbies, scores) VALUES(?,?,?,?,?)', [name, location, photo, hobbies, userArr.toString()]);

    //when query is complete, send user back to home page.
    res.redirect('/results');
}); //end newEmployee post



module.exports = app;
