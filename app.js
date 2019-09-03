var express=require('express');
var app=express();
var request=require('request');


app.set("view engine","ejs");



app.get("/",function(req,res){
	res.render("search");
});


app.get("/results",function(req,res){
	// console.log(req.query);
	var city=req.query.city;
	
	var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9b5d33a62a0b81bcbd0838a1e3305275`;
	
	request(url,function(error,response,body){
	
	var data=JSON.parse(body);
		console.log(data);
	var weather = {
		city: data.name,
		country:data.sys.country,
		long:data.coord.lon,
		lati:data.coord.lat,
		wind:data.wind.speed,
		cloud:data.clouds.all,
		temperature : ((data.main.temp)-273.15).toFixed(1),
		description: data.weather[0].description,
		icon:data.weather[0].icon
		};
		
	res.render("result",{climate:weather});
	});
});


app.get("*",function(req,res){
	res.send("ERROR 404 ! NOT FOUND");
});


app.listen(3000,function(){
	console.log("weather search engine started!!");
});