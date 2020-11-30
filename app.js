const express = require("express"),
env = process.env.NODE_ENV || 'development';
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



// Ensure https is used on heroku
var forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
 };



 if(process.env.NODE_ENV === 'production') {
	 app.use(forceSsl);
	 // additional prod environemtn configuration
	}

// Images for Gallery

var imageGallery = [
	{
		name: "Tallegalla",
		date: "13/08/20", 
		information: "Beautiful view up here in Tallegalla. We installed new roof and 175mm quad on spikes", 
		images: ["/Mt Tamborine/img1.jpg"]
	},
	{
		name: "Slacks Creek",
		date: "29/05/20", 
		information: "This was good and stuff", 
		images: ["/Slacks Creek/img1.jpg","/Slacks Creek/img2.jpg","/Slacks Creek/img3.jpg","/Slacks Creek/img4.jpg","/Slacks Creek/img5.jpg"]
	},
	{
		name: "Paddington",
		date: "27/03/20", 
		information: "This was good and stuff", 
		images: ["/Paddington/img1.jpg","/Paddington/img2.jpg","/Paddington/img3.jpg","/Paddington/img4.jpg","/Paddington/img5.jpg"]
	},
	{
		name: "Southport",
		date: "01/03/20", 
		information: "This job was a little more intricated with the unusual profile, and airconditioning unit created a bit of a challenge", 
		images: ["/Southport Office/img1.jpg","/Southport Office/img2.jpg","/Southport Office/img3.jpg","/Southport Office/img4.jpg","/Southport Office/img5.jpg","/Southport Office/img6.jpg","/Southport Office/img7.jpg","/Southport Office/img8.jpg","/Southport Office/img9.jpg","/Southport Office/img10.jpg"]
	},
	{
		name: "Ascot",
		date: "31/02/20",
		information: "This was a good job and stuff", 
		images: ["/Ascot/img1.jpg", "/Ascot/img2.jpg", "/Ascot/img3.jpg", "/Ascot/img4.jpg", "/Ascot/img5.jpg", "/Ascot/img6.jpg"]
	},
	{
		name: "Alstonville",
		date: "31/02/20", 
		information: "This was a good job and stuff", 
		images: ["/Alstonville/img1.jpg", "/Alstonville/img2.jpg", "/Alstonville/img3.jpg", "/Alstonville/img4.jpg", "/Alstonville/img5.jpg", "/Alstonville/img6.jpg"]
	},
	{
		name: "Coombabah",
		date: "31/02/20", 
		information: "This was a good job and stuff", 
		images: ["/Coombabah/img1.jpg", "/Coombabah/img2.jpg", "/Coombabah/img3.jpg", "/Coombabah/img4.jpg", "/Coombabah/img5.jpg", "/Coombabah/img6.jpg"]
	},
	{
		name: "Southport",
		date: "31/02/20", 
		information: "This was a good job and stuff", 
		images: ["/Southport/img1.jpg", "/Southport/img2.jpg", "/Southport/img3.jpg", "/Southport/img4.jpg", "/Southport/img5.jpg", "/Southport/img6.jpg"]
	}
];

app.post("/createQuote", urlencodedParser, (req, res)=>{
	console.log(req.body);
	const body = req.body;
	console.log(body)
	const body2 = "<h1>"+ body["First Name"]+" "+ body["Last Name"]+"</h1><br><h2> Email: "+ body["Email"]+" Number: "+ body["Number-quote"]+"</h2><br><p>"+ " "+body["Message"] +"</p><br><h4>" +  body["Address"]+ "</h4><br><br><h4> Email sent through Website </h4>";
	transporter.sendMail({
		to: "cbroofing@gmail.com",
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
		imageGallery: imageGallery,
		title: "Gallery"
	});
})

app.get("/Gallery/:id", function(req, res){
	var projectName = req.params.id;
	imageGallery.forEach(function(data){
		if(data.name === projectName){
			res.render("viewImages",
				{
					images: data.images,
					name: data.name, 
					date: data.date,
					information: data.information,
					title: "Project"
				})
			}
		})
	// res.redirect("/")
})

// app.get("/Gallery/Southport", function(req,res){
// 	res.render("Southport", {
// 		title: "Project"
// 	});
// })

// app.get("/Gallery/Coombabah", function(req,res){
// 	res.render("Coombabah", {
// 		title: "Project"
// 	});
// })

// app.get("/Gallery/Alstonville", function(req,res){
// 	res.render("Alstonville", {
// 		title: "Project"
// 	});
// })
// app.get("/Gallery/Ascot", function(req,res){
// 	res.render("Ascot", {
// 		title: "Project"
// 	});
// })

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
