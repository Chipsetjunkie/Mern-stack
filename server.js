const express = require('express');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

//Express instantiation
app = express();

// Parser
app.use(express.json({extended:false}));

//routes
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/user',require('./routes/api/user'));

// Database initiation
connectDB();

app.get('/',(req,res)=>{
  res.send("Api is workin")
})


const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log("Running custom server..."))
