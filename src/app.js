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

// let total;
let currentDiff;
let bestDiff;
let bestFriend;

function firstDiff(init, surveyUser){
		console.log("first friend " + init);
		console.log("Survey input " + surveyUser);
		let currentArr = init.scores.split(",");
		console.log(currentArr);
		evalDiff(currentArr, surveyUser);
		bestDiff = currentDiff;
		console.log("BD: " + bestDiff);
		bestFriend = init.name;
		console.log("Bf: " + bestFriend);
};

function evalDiff(arr1, arr2){

	if( arr1.length !== arr2.length ){
		throw new Error("arrays not same length");
	}
	let total = 0;
	const length = arr1.length;
	for(var i = 0; i < length; i++){
		total += Math.abs(arr1[i] - arr2[i]);
	}
	console.log("I'm the total difference: " + total );
	currentDiff = total;
	return total;
}

function evalBestMatch(total){
	let bestDiff;
	if(total > bestDiff){
		return
	}
	bestdiff = total;
	console.log(bestDiff);
	return bestDiff;
}

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

app.get('/results', function(req, res){
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

	connection.query('SELECT * FROM friends', function(err, data){
		if (err) throw err;


		// loop through results from mysql database
		// turn 'scores' string into array
		// subtract each index in scores array with coinciding index in user answer
		// add all the differences together
		// find smallest difference to locate best match
		// return best match

		// Use first friend to initialize bestDiff variable for comparison
		firstDiff(data[0], userArr);

		for (var i = 0; i<data.length; i++){

		
			console.log("I'm splitting the scores from the database: " + data[i].scores.split(","));
			let currentArr = data[i].scores.split(",");
			console.log("I'm the currentArray! " + currentArr);
			evalDiff(currentArr, userArr);
			console.log("The currentDiff is: " + currentDiff);

			if( currentDiff < bestDiff){
				bestFriend = data[i].name;
				console.log("NEW BFF is" + bestFriend);
				bestDiff = currentDiff;
			}
			else{
				console.log(currentDiff + "CD");
				console.log(bestDiff + "BD");
			}

		 } 
		console.log("the best diff is " + bestDiff + " and the best friend is " + bestFriend);
			

		
		
	});
	

	//query our database using sql, insert new record into our database using user's input. //this method is SQL injectable!! (that's a bad thing, but I'm leaving this here to demonstrate SQL injection attacks to the class)
	//connection.query('INSERT INTO employees(first_name, last_name, age, enjoys) VALUES("' + first_name + '","' + last_name + '",' + age + ',"' + enjoys +  '")');

	//here's an alternate secure method as per the documentation.
	connection.query('INSERT INTO friends(name, photo, scores) VALUES(?,?, ?)',[name, photo, userArr.toString()]);

	//when query is complete, send user back to home page.
	res.redirect('/results');	
});//end newEmployee post



module.exports =app;
