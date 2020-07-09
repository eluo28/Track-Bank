const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path')


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

//serve static assets if in prod
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })

}

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server started on ${port}`));

