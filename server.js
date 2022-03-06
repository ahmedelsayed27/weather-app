// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = process.env.PORT || 3000;
// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()
/* Middleware*/
const bp = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port,()=>{
    console.log('server is starting on port 3000')
    console.log('http://localhost:3000')
})

// server respons to user 
app.get('/allinfo',(req,res)=>{
    res.send(projectData)
})

// client post data to server
app.post('/adduserdata',(req , res)=>{
//    date :  `${req.body.date}`, // from data var
//    temp = `${req.body.temp}`,  // from api main.temp
//    feeling = `${req.body.feeling}`// from index.html element
   projectData = req.body;
})