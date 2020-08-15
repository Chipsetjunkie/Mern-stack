const express= require('express');
const posts = express.Router();

posts.get('/',(req,res) =>
      res.send("posts Loaded")
);

module.exports = posts;
