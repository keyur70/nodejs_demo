const express = require('express');
const app = express();
const students = require('./apis/routes/student');
const mongoose = require('mongoose');
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

app.use('/user', students);


app.use((req, res) => res.status(403).json({
    error: "response error"
}))

module.exports = app;