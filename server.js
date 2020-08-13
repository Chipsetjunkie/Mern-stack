const express = require('express')
const path = require('path')
const fs = require('fs')

app = express();

app.get('/',(req,res)=>{
  res.send("Api is workin")
})


const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log("Running custom server..."))
