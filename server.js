const bodyParser = require("body-parser");
const express = require("express");
const multer = require('multer');

const userRoutes = require('./routes/user_routes');
const bookRoutes = require('./routes/book_routes');


const {connectDB}= require('./config/db');

const app = express();



app.use(express.json());
app.use(bodyParser.json());

connectDB();

app.use('/user', userRoutes);
app.use('/book', bookRoutes);


app.listen(3001,()=>{
    console.log("Server Started");
})