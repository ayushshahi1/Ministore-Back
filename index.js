const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const fileUpload = require('express-fileupload');


mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://hunterboy:ayush1998@cluster0.fxwwuen.mongodb.net/MiniStore').then((res) => {
  app.listen(port, () =>{
    console.log('listening', port)
  })
}).catch((err)=>{
  console.log(err)
})

app.use(cors());
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({extended: true}))
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 *1024 },
  abortOnLimit: true,
}));


app.use(authRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.use((req,res) => {
  return res.status(404).json('not found')
})



