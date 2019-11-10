var express = require("express");
var app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req,res){
	res.render("Home");
})

app.get("/About", function(req,res){
	res.render("about");
})

app.get("/Gallery", function(req,res){
	res.render("Gallery");
})

app.get("/Gallery/Southport", function(req,res){
	res.render("Southport");
})

app.get("/Gallery/Coombabah", function(req,res){
	res.render("Coombabah");
})

app.get("/Gallery/Alstonville", function(req,res){
	res.render("Alstonville");
})


app.get("*", function(req,res){
	res.render("unknown");
})

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server Has Started!");
});
