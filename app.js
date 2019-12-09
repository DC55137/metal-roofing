const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const sendgridTransport = require('nodemailer-sendgrid-transport');


const transporter = nodemailer.createTransport(sendgridTransport({
	auth: {
		api_key: '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'
	}
}))
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.post("/createQuote", urlencodedParser, (req, res)=>{
	console.log(req.body);
	const body = req.body;
	console.log(body)
	const body2 = "<h1>"+ body["First Name"]+" "+ body["Last Name"]+"</h1><br><h2> Email: "+ body["Email"]+" Number: "+ body["Number-quote"]+"</h2><br><p>"+ " "+body["Message"] +"</p><br><br><h4> Email send through Website </h4>";
	transporter.sendMail({
		to: "daniel.correa55137@gmail.com",
		from: "cbroofing@hotmail.com",
		subject: "quote recieved",
		html: body2
	})
	console.log(body2);
	res.render("Home");
})

app.get("/", function(req,res){
	res.render("Home");
})

app.get("/Quote", function(req,res){
	res.render("Quote");
})

app.get("/About", function(req,res){
	res.render("about");
})

app.get("/Gutter", function(req,res){
	res.render("Gutter");
})

app.get("/DownPipes", function(req,res){
	res.render("DownPipes");
})
app.get("/SkyLights", function(req,res){
	res.render("Sky Light");
})

app.get("/WhirlyBirds", function(req,res){
	res.render("Whirly Birds");
})
app.get("/Insulation", function(req,res){
	res.render("Insulation");
})
app.get("/RoofAnchors", function(req,res){
	res.render("Roof Anchors");
})
app.get("/RoofWalkways", function(req,res){
	res.render("Roof Walkways");
})
app.get("/EdgeProtection", function(req,res){
	res.render("Edge Protection");
})
app.get("/AsbestosRemoval", function(req,res){
	res.render("Asbestos Removal");
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
app.get("/Gallery/Ascot", function(req,res){
	res.render("Ascot");
})

// app.get("/:services", (req, res)=>{
// 	newName = req.params.services.toString();
// 	res.render(newName)
// })

app.get("*", function(req,res){
	res.render("unknown");
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server Has Started!");
});
