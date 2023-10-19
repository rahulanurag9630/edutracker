const mongoose = require('mongoose');

const notice = new mongoose.Schema({
   noticeType:{
    type:String,
    require:true
   },
   notice:{
    type:String,
    require:true
   }
  });
  
  const Notice = mongoose.model('Notice', notice);
  
  module.exports = Notice;
  