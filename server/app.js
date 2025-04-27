const express=require('express')
const app=express()
require('dotenv').config() 
const mongoose=require('mongoose')
const PORT=process.env.PORT || 5000
const cors = require("cors");

app.use(cors());
mongoose.set("strictQuery", true);
mongoose.connect('process.env.MONGO_URI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

mongoose.connection.on('connected',()=> console.log("connect to database mongodb"))

mongoose.connection.on('error',(err)=>{
    console.log("err connection",err)
})
require('./models/user')
require('./models/post')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(PORT,()=>{
    console.log("server is running",PORT)
})
