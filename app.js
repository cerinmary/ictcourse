const express = require("express");
const CourseInfo = require('./model/testDb');
const path = require('path');
//intialising express
const app = new express();
//Api creation

/*app.get('/api', (req,res)=>{
    res.json([{"name":"mia","place":"tvm"},{"name":"nia","place":"ekm"}]); 
}) */
app.use((req,res,next)=>{
    res.setHeader("Access-control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-control-Allow-Headers","X-Requested-With,content-type");
    res.setHeader("Access-control-Allow-Credentials",true);
    next();
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,'/build')));

app.get('/',(req,res)=>{
    res.send("server up");
}
);

// create
app.post('/api/create',(req,res)=>{
    try{
     //console.log(req.body); //server data
    let course = new CourseInfo(req.body); // passing to db
    course.save(); // saving to db

res.send("Data Added");
    }
    catch(error){
        res.status(500).send(error);
    }
});

//read
app.get('/api/view',async (req,res)=>{
    try{
        let result= await CourseInfo.find();
        res.json(result);
    
}
catch(error) {
res.status(500).send(error); 
}
});
//update
app.post('/api/update',(req,res)=>{
    try{
    CourseInfo.findByIdAndUpdate(req.body._id, req.body); //put our db id of updating item
    res.send("Data updated");

    }
    catch(error) {
        res.status(500).send(error); 
        }
});
//delete
app.post('/api/delete',async (req,res)=>{
    try{
  await CourseInfo.findByIdAndDelete(req.body._id);
  res.send("Data deleted");
    }
    catch(error) {
        res.status(500).send(error); 
        }
});

//search
app.post('/api/search',async (req,res)=>{
    try{
       // let result= await CourseInfo.find(req.body);
        let result= await CourseInfo.find({"cName":{$regex:'.*'+req.body.cName +'.*'}});
        res.json(result);
    
}
catch(error) {
res.status(500).send(error); 
}
});

app.get('/*',function(req,res) {

    res.sendFile(path.join(__dirname,'/build/index.html'));
});

//setting port number
app.listen(8003, ()=>{
    console.log("listening to port 8003");
})
