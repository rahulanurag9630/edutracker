

const mongoose = require('mongoose');
const uri = "mongodb+srv://anurag:anuragsinghkushwaha45@cluster0.v9fig4z.mongodb.net/eduTracker?retryWrites=true&w=majority";

const connectToMongo = () =>{
    return mongoose.connect(uri)
    .then(()=>{
        console.log("successfully connected to mongodb");
    })
    .catch((err)=>{
        console.error("error to connect with mongo"+err);
    })
}
module.exports = connectToMongo;