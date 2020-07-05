const express = require('express');
const mongoose = require('mongoose');
const config = require('config');


const app = express();

app.use(express.json({limit: '50mb'}));

//DB config
const datab = config.get('mongoURI');

//connect to MongoDB
mongoose.connect(datab,{useUnifiedTopology:true, useNewUrlParser:true,useCreateIndex:true})
    .then(()=>console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));


//use routes
app.use('/api/items',require('./routes/api/items'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));


const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server started on ${port}`));

