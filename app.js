const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
})
const app = express();

// const Testimonials = 

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.post("/createQuote", urlencodedParser, (req, res)=>{
	console.log(req.body);
	const body = req.body;
	console.log(body)
	const body2 = "<h1>"+ body["First Name"]+" "+ body["Last Name"]+"</h1><br><h2> Email: "+ body["Email"]+" Number: "+ body["Number-quote"]+"</h2><br><p>"+ " "+body["Message"] +"</p><br><br><h4> Email sent through Website </h4>";
	transporter.sendMail({
		to: "daniel.correa55137@gmail.com",
		from: "daniel.cbroofing@gmail.com",
		subject: "quote recieved",
		html: body2
	}, (err, data)=>{
		if(err){
			console.log('error occurs sending', err)
		}else{
			console.log("email sent")
		}
	})
	console.log(body2);
	res.render("Home", {
		title: "Home"
	});
})

app.get("/", function(req,res){
	res.render("Home", {
		title:'Home'
	});
})

app.get("/Quote", function(req,res){
	res.render("Quote", {
		title: 'Quote'
	});
})

app.get("/About", function(req,res){
	res.render("about", {
		title: "about"
	});
})

app.get("/Gutter", function(req,res){
	res.render("Gutter", {
		title: "services"
	});
})

app.get("/DownPipes", function(req,res){
	res.render("DownPipes", {
		title: "services"
	});
})
app.get("/SkyLights", function(req,res){
	res.render("Sky Light", {
		title: "services"
	});
})

app.get("/WhirlyBirds", function(req,res){
	res.render("Whirly Birds", {
		title: "services"
	});
})
app.get("/Insulation", function(req,res){
	res.render("Insulation", {
		title: "services"
	});
})
app.get("/RoofAnchors", function(req,res){
	res.render("Roof Anchors", {
		title: "services"
	});
})
app.get("/RoofWalkways", function(req,res){
	res.render("Roof Walkways", {
		title: "services"
	});
})
app.get("/EdgeProtection", function(req,res){
	res.render("Edge Protection", {
		title: "services"
	});
})
app.get("/AsbestosRemoval", function(req,res){
	res.render("Asbestos Removal", {
		title: "services"
	});
})

app.get("/Gallery", function(req,res){
	res.render("Gallery", {
		title: "Gallery"
	});
})

app.get("/Gallery/Southport", function(req,res){
	res.render("Southport", {
		title: "Project"
	});
})

app.get("/Gallery/Coombabah", function(req,res){
	res.render("Coombabah", {
		title: "Project"
	});
})

app.get("/Gallery/Alstonville", function(req,res){
	res.render("Alstonville", {
		title: "Project"
	});
})
app.get("/Gallery/Ascot", function(req,res){
	res.render("Ascot", {
		title: "Project"
	});
})

app.get("/Testimonials", function(req, res){
	res.render("Testimonials",{
		title: "Testimonials"
	});
})

// app.get("/:services", (req, res)=>{
// 	newName = req.params.services.toString();
// 	res.render(newName)
// })

app.get("*", function(req,res){
	res.render("unknown", {
		title: "Home"
	});
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server Has Started!");
});
