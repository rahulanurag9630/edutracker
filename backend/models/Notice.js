const mongoose = require('mongoose');

const notice = new mongoose.Schema({
   nFor: {
      type: String,
      enum: ['Parent','Student'],
      required: true,
    },
   noticeType:{
    type:String,
    require:true
   },
   notice:{
    type:String,
    require:true
   },
   createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 7, // Automatically delete records after 7 days (in seconds)
    },
  });
  
  const Notice = mongoose.model('Notice', notice);
  
  module.exports = Notice;
  