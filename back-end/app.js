const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const userRoutes = require('./routes/user-route');
const conversationRoutes = require('./routes/conversation-route');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST'
    );
    
    next();
});

app.use('/user' , userRoutes);
app.use('/conversation' , conversationRoutes);

mongoose.connect('<MongoDBString>', { useNewUrlParser: true })
        .then(() => console.log('connected to database'))
        .catch((err) => console.log(err + 'could not connect to databse'));

app.listen(5000);