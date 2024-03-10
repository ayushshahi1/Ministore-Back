const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')


mongoose.set('strictQuery',false)

mongoose.connect('mongodb+srv://hunterboy:ayush1998@cluster0.fxwwuen.mongodb.net/MiniStore').then((res) => {
  app.listen(port, () =>{
    console.log('listening', port)
  })
}).catch((err)=>{
  console.log(err)
})

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(authRoutes)

app.use((req,res) => {
  return res.status(404).json('not found')
})