const express = require('express');
const app = express();
const path = require('path');
const methodOverRide = require('method-override');
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(methodOverRide("_method"));

//middleware
app.use((req,res,next)=>{
    req.responseTime = new Date(Date.now()).toString();
    console.log(req.method, req.path,req.responseTime,req.hostname);
    next();
});



app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.post("/req",(req,res)=>{
    res.send("received");
});

//Server
app.listen(8080,()=>{
    console.log("Server running on Port: 8080");
});