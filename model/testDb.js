//importing
const mongoose = require("mongoose");
//connecting database
mongoose.connect("mongodb+srv://cerinmary:cerinsiby@cluster0.ck6wsrc.mongodb.net/?retryWrites=true&w=majority")
mongoose.set('strictQuery',true);

//schem
const Schema = mongoose.Schema;


var courseSchema = new Schema({
  cName : String,
  cDesc : String,
  cDuration : Number,
  cStartdate :Date

});

var CourseInfo=mongoose.model("courses",courseSchema);

module.exports= CourseInfo;