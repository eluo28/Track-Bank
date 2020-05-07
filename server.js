const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose.connect(db,{useUnifiedTopology:true, useNewUrlParser:true})
    .then(()=>console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));

//use routes
app.use('/api/items','./routes/api/items');
app.use('/api/users','./routes/api/users');


const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server started on ${port}`));

