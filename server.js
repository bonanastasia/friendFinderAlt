const app = require("./src/app");

app.listen(process.env.PORT || 3000, function(){
	process.env.PORT === undefined? console.log("App listening on PORT 3000"):console.log("App listening on PORT"+ process.env.PORT);
});