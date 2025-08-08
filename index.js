const express = require('express');
const app = express();
const path = require('path');
const methodOverRide = require('method-override');
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(methodOverRide("_method"));
const ExpressError = require('./ExpressError.js');

//middleware
// app.use((req,res,next)=>{
//     req.responseTime = new Date(Date.now()).toString();
//     console.log(req.method, req.path,req.responseTime,req.hostname);
//     next();
// });

//Access Token
const checkToken = (req,res,next)=>{
    let {token} = req.query;
    if(token === "iamironman"){
        next();
    }
    throw new ExpressError(401,"Access Denied");
};

app.get("/api",checkToken,(req,res)=>{
    res.send("data");
});

const adminReq = (req,res,next)=>{
    let {token} = req.query;
    console.log("Request to admin route is received");
    if(token=="Admin"){
        return next();
    }
    throw new ExpressError(403,"Your are not the boss");
};

app.get("/admin",adminReq,(req,res)=>{
    console.log("Request to admin route 2 is received");
    res.send("hello Sir");
});

app.get("/err",(req,res)=>{
    console.log("request to err route is received");
    abc = abc;
});

app.use((err,req,res,next)=>{
    let {status=500, message} = err;
    console.log("---------ERROR----------");
    res.status(status).send(message);
})
//Server
app.listen(8080,()=>{
    console.log("Server running on Port: 8080");
});