const mongoose = require("mongoose");

//connect

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Connection successfull"))
  .catch(() => {
    console.log("Connection failed");
  });

  //create schema
  const bookSchema = new mongoose.Schema({
    Id:Number,
    Title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    Author:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    Genre:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    Published_year: {
        type: Number,
        min: 1000,
        max: new Date().getFullYear() // Set the max year dynamically to the current year
    }
  });

  const Book = mongoose.model("Book",bookSchema);
  module.exports = Book;