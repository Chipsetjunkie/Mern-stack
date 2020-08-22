const express = require('express');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

//Express instantiation
app = express();

// Database initiation
connectDB();

// Parser
app.use(express.json({extended:false}));

//routes
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/user',require('./routes/api/user'));

//Serve static files
if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}



const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log("Running custom server..."))
