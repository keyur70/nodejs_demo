const mongoose = require('mongoose');
const express = require('express');
const user = require('./apis/routes/user_routes');
const app = express();
const bodyParese = require('body-parser');




mongoose.connect('mongodb+srv://keyue:keyur@cluster0.xstg9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.connection.on('error', err => {
    console.log('connection error');
})
mongoose.connection.on('connected', connected => {
    console.log('connection sucessfull');
})



app.use(bodyParese.urlencoded({ extended: false }));
app.use(bodyParese.json());

app.use('/user', user);

app.use((req, res) => res.status(403).json({
    error: "response error"
}))


module.exports = app;