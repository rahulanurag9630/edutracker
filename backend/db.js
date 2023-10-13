

const mongoose = require('mongoose');
const uri = process.env.DB;

const connectToMongo = () =>{
    return mongoose.connect(uri)
    .then(()=>{
        console.log("successfully connected to mongodb");
        console.log('DB URI:', process.env.DB);
    })
    .catch((err)=>{
        console.error("error to connect with mongo"+err);
       

    })
}  
module.exports = connectToMongo;