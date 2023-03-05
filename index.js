//Basic server structure
//import express
const express = require("express")
//intialising express
const app = new express();
//Api creation
app.get('/', (req,res)=>{
    res.send("congratulations,,server is up.");
});
//parsing body parameters
app.use(express.urlencoded({extended:true}));
app.use(express.json);

//app.post('/facebook/signup', (req,res)=>{

   // res.send('Hi,${req.body.name},your account is successfully created');
// })

//setting port number
app.listen(5000, ()=>{
    console.log("server is running in port 5000");
})