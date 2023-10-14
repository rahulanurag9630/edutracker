require('dotenv').config();
const connectToMongo =require('./db');
connectToMongo();
var cors = require('cors')
const path = require('path');

const express = require('express')
const app = express()
const port = 5000;
app.use(cors());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json())

app.use('/api/auth' ,require('./routes/auth'));
app.use('/api/students' ,require('./routes/students'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})