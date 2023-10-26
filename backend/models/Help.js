const mongoose = require('mongoose');

const help = new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   email:{
    type:String,
    required:true
   },
   message:{
    type:String,
    required:true
   }
  });
  
  const Help = mongoose.model('Help', help);
  
  module.exports = Help;
  