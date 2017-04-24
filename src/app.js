const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'friendFinder_db'
});

connection.connect();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.get('/API', function(req, res){
	connection.query('SELECT * FROM friends', function(err, data){
		if(err) throw err;
		res.send(data);
	});
});


app.post('/survey',function(req,res){

	//confirm that you're receiving data
	console.log(req.body);

	//set the req.body into a few variables to use in your upcoming query.
	let name = req.body.name;
	let photo = req.body.photo;
	let userArr = [req.body.q1, req.body.q2, req.body.q3, req.body.q4, req.body.q5, req.body.q6, req.body.q7, req.body.q8, req.body.q9, req.body.q10];
	console.log(userArr);
	

	//query our database using sql, insert new record into our database using user's input. //this method is SQL injectable!! (that's a bad thing, but I'm leaving this here to demonstrate SQL injection attacks to the class)
	//connection.query('INSERT INTO employees(first_name, last_name, age, enjoys) VALUES("' + first_name + '","' + last_name + '",' + age + ',"' + enjoys +  '")');

	//here's an alternate secure method as per the documentation.
	connection.query('INSERT INTO friends(name, photo, scores) VALUES(?,?, ?)',[name, photo, userArr.toString()]);

	//when query is complete, send user back to home page.
	// res.redirect('/');	
});//end newEmployee post

module.exports =app;