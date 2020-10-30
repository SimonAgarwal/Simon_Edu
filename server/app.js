const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const multer=require('multer');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config=require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log("Connected to database"+config.database);
})
mongoose.connection.on('error',(err)=>{
    console.log("Connected to database"+err);
})

app=express();
const users=require('./routes/users');

app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/',users);


app.listen(3000,function(){
    console.log("Server started");
})

